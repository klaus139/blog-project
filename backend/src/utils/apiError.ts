export class apiError extends Error {
    public statuscode: number;
    public status: string;
    
    constructor(message: string, statuscode: number) {
      super(message);
      this.statuscode = statuscode;
      this.status = `${statuscode}`.startsWith('4') ? "fail" : "error";
    }
  }
  