import { SyncState, SyncQueueItem } from '../types';
import { db } from './database';

type SyncListener = (state: {
  status: SyncState;
  pendingCount: number;
  lastSyncedAt: string | null;
  isSimulatedOffline: boolean;
  isSyncing: boolean;
}) => void;

class SyncEngine {
  private syncState: SyncState = 'online';
  private isSimulatedOffline: boolean = false;
  private lastSyncedAt: string | null = null;
  private listeners: SyncListener[] = [];
  private autoSyncInterval: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const realOnline = navigator.onLine;
      this.syncState = realOnline ? 'online' : 'offline';

      window.addEventListener('online', () => {
        if (!this.isSimulatedOffline) {
          this.syncState = 'online';
          this.notify();
          this.triggerSync();
        }
      });

      window.addEventListener('offline', () => {
        this.syncState = 'offline';
        this.notify();
      });

      // Background periodic sync check every 15 seconds if online
      this.autoSyncInterval = setInterval(() => {
        if (this.isOnline() && this.getPendingCount() > 0 && this.syncState !== 'syncing') {
          this.triggerSync();
        }
      }, 15000);
    }
  }

  public subscribe(listener: SyncListener) {
    this.listeners.push(listener);
    // emit current state
    listener(this.getState());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((l) => l(state));
  }

  public getState() {
    return {
      status: this.syncState,
      pendingCount: this.getPendingCount(),
      lastSyncedAt: this.lastSyncedAt,
      isSimulatedOffline: this.isSimulatedOffline,
      isSyncing: this.syncState === 'syncing',
    };
  }

  public async syncNow(): Promise<number> {
    const res = await this.triggerSync();
    return res.syncedCount;
  }

  public isOnline(): boolean {
    if (this.isSimulatedOffline) return false;
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  public getPendingCount(): number {
    return db.getSyncQueue().filter((q) => q.status === 'PENDING').length;
  }

  public toggleSimulatedOffline(): boolean {
    this.isSimulatedOffline = !this.isSimulatedOffline;
    if (this.isSimulatedOffline) {
      this.syncState = 'offline';
    } else {
      this.syncState = navigator.onLine ? 'online' : 'offline';
      if (this.syncState === 'online') {
        this.triggerSync();
      }
    }
    this.notify();
    return this.isSimulatedOffline;
  }

  public async triggerSync(): Promise<{ success: boolean; syncedCount: number }> {
    if (!this.isOnline()) {
      this.syncState = 'offline';
      this.notify();
      return { success: false, syncedCount: 0 };
    }

    const pendingItems = db.getSyncQueue().filter((q) => q.status === 'PENDING');
    if (pendingItems.length === 0) {
      this.syncState = 'synced';
      this.notify();
      return { success: true, syncedCount: 0 };
    }

    this.syncState = 'syncing';
    this.notify();

    let syncedCount = 0;

    try {
      for (const item of pendingItems) {
        // Simulate network latency for background upload
        await new Promise((resolve) => setTimeout(resolve, 350));

        // Process item idempotently
        if (item.entityType === 'LOT') {
          const lot = db.getLotById(item.entityId);
          if (lot) {
            lot.syncStatus = 'SYNCED';
            db.saveLot(lot, false);
          }
        }

        item.status = 'SYNCED';
        db.updateSyncQueueItem(item);
        syncedCount++;
      }

      this.syncState = 'synced';
      this.lastSyncedAt = new Date().toLocaleTimeString();
      db.clearSyncedQueue();
      this.notify();

      // Automatically reset to 'online' after 3 seconds
      setTimeout(() => {
        if (this.syncState === 'synced' && this.isOnline()) {
          this.syncState = 'online';
          this.notify();
        }
      }, 3500);

      return { success: true, syncedCount };
    } catch (err) {
      console.error('Sync failed:', err);
      this.syncState = 'sync_failed';
      this.notify();
      return { success: false, syncedCount };
    }
  }

  public retryItem(itemId: string) {
    const queue = db.getSyncQueue();
    const item = queue.find((q) => q.id === itemId);
    if (item) {
      item.status = 'PENDING';
      item.retryCount = (item.retryCount || 0) + 1;
      db.updateSyncQueueItem(item);
      if (this.isOnline()) {
        this.triggerSync();
      }
    }
  }
}

export const syncEngine = new SyncEngine();
