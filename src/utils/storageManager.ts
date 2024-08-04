/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Class representing a storage manager.
 */
class StorageManager {
  /**
   * The storage object (e.g., localStorage or sessionStorage).
   * @type {Storage}
   */
  manager: Storage;

  /**
   * Create a storage manager.
   * @param {Storage} manager - The storage object (e.g., localStorage or sessionStorage).
   */
  constructor(manager: Storage) {
    this.manager = manager;
  }

  /**
   * Set an item in storage.
   * @param {string} key - The key under which the value is stored.
   * @param {unknown} value - The value to store.
   */
  setItem(key: string, value: unknown) {
    try {
      this.manager.setItem(key, JSON.stringify(value));
    } catch (_error: any) {
      console.error(new Error(`Error setting item in storage`));
    }
  }

  /**
   * Get an item from storage.
   * @param {string} key - The key of the item to retrieve.
   * @param {boolean} [shouldNotParse=false] - Whether to parse the retrieved value as JSON. Defaults to false.
   * @returns {T | string | null} The retrieved value, parsed as JSON if shouldParse is true, or as a string otherwise. Returns null if the item does not exist or an error occurs.
   */
  getItem<T = string, S extends boolean = false>(key: string, shouldNotParse?: S): T | null {
    try {
      const value = this.manager.getItem(key);
      return (value ? (shouldNotParse ? value : (JSON.parse(value) as T)) : null) as T | null;
    } catch (_error: any) {
      console.error(new Error(`Error getting item from storage`));
      return null;
    }
  }

  /**
   * Remove an item from storage.
   * @param {string} key - The key of the item to remove.
   */
  removeItem(key: string) {
    try {
      this.manager.removeItem(key);
    } catch (_error: any) {
      console.error(new Error(`Error removing item from storage`));
    }
  }

  /**
   * Clear all items from storage.
   */
  clear() {
    try {
      this.manager.clear();
    } catch (_error: any) {
      console.error(new Error(`Error clearing storage`));
    }
  }

  /**
   * Get the number of items in storage.
   * @returns {number} The number of items in storage. Returns 0 if an error occurs.
   * @readonly
   * @example
   * const length = localStorageManager.length;
   * console.log(length);
   */
  get length(): number {
    try {
      return this.manager.length;
    } catch (_error: any) {
      console.error(new Error(`Error getting storage length`));
      return 0;
    }
  }

  /**
   * Get the key at a specified index in storage.
   * @param {number} index - The index of the key to retrieve.
   * @returns {string | null} The key at the specified index. Returns null if the index is out of range or an error occurs.
   */
  key(index: number): string | null {
    try {
      return this.manager.key(index);
    } catch (_error: any) {
      console.error(new Error(`Error getting key from storage`));
      return null;
    }
  }

  /**
   * Get the storage object.
   * @returns {Storage} The storage object.
   * @readonly
   * @example
   * const storage = localStorageManager.storage;
   * storage.setItem("key", "value");
   * console.log(storage.getItem("key"));
   * @example
   */
  get storage(): Storage {
    return this.manager;
  }

  /**
   * Check if storage is available.
   * @returns {boolean} True if storage is available, false otherwise.
   * @readonly
   * @example
   * if (localStorageManager.isAvailable) {
   *   console.log("localStorage is available");
   * }
   */
  get isAvailable(): boolean {
    try {
      this.manager.setItem("test", "test");
      this.manager.removeItem("test");
      return true;
    } catch (_error: any) {
      return false;
    }
  }

  /**
   * Check if storage is empty
   * @returns {boolean} True if storage is empty, false otherwise.
   * @readonly
   * @example
   * if (localStorageManager.isEmpty) {
   *   console.log("localStorage is empty");
   * }
   */
  get isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Check if storage is not empty
   * @returns {boolean} True if storage is not empty, false otherwise.
   * @readonly
   * @example
   * if (localStorageManager.isNotEmpty) {
   *   console.log("localStorage is not empty");
   * }
   */
  get isNotEmpty(): boolean {
    return !this.isEmpty;
  }
}

export const localStorageManager = new StorageManager(localStorage);
export const sessionStorageManager = new StorageManager(sessionStorage);
