import Backend from "i18next-http-backend";
import type { ReadCallback } from "i18next";
import { getEndpoint } from "../endpoints";

class CustomBackend extends Backend {
  read(language: string, namespace: string, callback: ReadCallback): void {
    // Fetch translations from the primary endpoint
    super.read(language, namespace, (error, data) => {
      if (error) {
        // If fetching from the primary endpoint has failed, try to fetch from the secondary endpoint
        super.loadUrl(getEndpoint(language, namespace), (secondaryError, secondaryData) => {
          if (secondaryError) {
            // Fallback if fetching from both endpoints has failed
            callback(null, {});
          } else {
            callback(null, secondaryData);
          }
        });
      } else {
        callback(null, data);
      }
    });
  }
}

export default CustomBackend;
