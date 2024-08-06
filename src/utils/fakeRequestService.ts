/* eslint-disable @typescript-eslint/no-explicit-any */

interface FakeRequestSuccessResponse<T = any> {
  status: number;
  data: T;
}

// Define your fake request service class
class FakeRequestServiceClass {
  isSuccessful = true;

  private errorRequestResponse = {
    status: 500,
    message: "Internal Server Error",
  };

  // Method to make a POST request (fake implementation)
  async post<T = any>(_url: string, _data: any, successData: T): Promise<FakeRequestSuccessResponse<T>> {
    // Replace this with your own fake data
    return await this.delayedPromise<T>({ status: 200, data: successData });
  }

  private getRandomMilliseconds = () => Math.floor(Math.random() * 1000);

  private delayedPromise = <T = any>(config: FakeRequestSuccessResponse<T>) =>
    new Promise<FakeRequestSuccessResponse<T>>((res, rej) =>
      setTimeout(
        () => (this.isSuccessful ? res(config) : rej(this.errorRequestResponse)),
        this.getRandomMilliseconds(),
      ),
    );
}

export const FakeRequestService = new FakeRequestServiceClass();
