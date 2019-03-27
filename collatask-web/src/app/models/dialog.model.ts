export class DialogData {
    public Header: string;
    public SubHeader: string;
    public Message: string;
    public Data: any;

    constructor(hdr: string, sub: string, msg: string, data: any) {
        this.Header = hdr;
        this.SubHeader = sub;
        this.Message = msg;
        this.Data = data;
    }
}