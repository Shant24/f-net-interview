/* eslint-disable @typescript-eslint/no-explicit-any */

import { STORAGE_KEYS } from "@/constants";
import type { CustomStorageManager } from "@/utils/storageManager";
import { sessionStorageManager } from "@/utils/storageManager";

interface FakeRequestSuccessResponse<T = any> {
  status: number;
  data: T;
}

interface FakeRequestErrorResponse {
  status: number;
  message: string;
}

// Define your fake request service class
class FakeRequestServiceClass {
  private _isSuccessful = true;
  private storage: CustomStorageManager;
  private baseErrorRequestResponse = {
    status: 500,
    message: "Internal Server Error",
  };

  constructor(storage: CustomStorageManager) {
    this.storage = storage;
    this._isSuccessful = this.storage.getItem<boolean>(STORAGE_KEYS.IS_RESPONSE_SUCCESSFUL) ?? this._isSuccessful;
  }

  // Method to make a POST request (fake implementation)
  async post<T = any>(
    _url: string,
    _data: any,
    { successData = undefined as any, errorData }: { successData?: T; errorData?: FakeRequestErrorResponse } = {},
  ): Promise<FakeRequestSuccessResponse<T>> {
    // Replace this with your own fake data
    return await this.delayedPromise<T>({ status: 200, data: successData }, errorData);
  }

  private getRandomMilliseconds = () => Math.floor(Math.random() * 1000);

  private delayedPromise = <T = any>(config: FakeRequestSuccessResponse<T>, errorData?: FakeRequestErrorResponse) =>
    new Promise<FakeRequestSuccessResponse<T>>((res, rej) =>
      setTimeout(
        () => (this.isSuccessful ? res(config) : rej(errorData ?? this.baseErrorRequestResponse)),
        this.getRandomMilliseconds(),
      ),
    );

  get isSuccessful() {
    return this._isSuccessful;
  }

  set isSuccessful(value: boolean) {
    this.storage.setItem(STORAGE_KEYS.IS_RESPONSE_SUCCESSFUL, value);
    this._isSuccessful = value;
  }
}

export const FakeRequestService = new FakeRequestServiceClass(sessionStorageManager);
