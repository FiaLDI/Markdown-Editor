export interface WindowSystemDomain {
  minimize(): Promise<void>;
  toggleMaximize(): Promise<void>;
  close(): Promise<void>;
}
