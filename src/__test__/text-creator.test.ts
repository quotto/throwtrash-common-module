import {TextCreator} from "../client/text-creator"

describe("TextCreator",()=>{
    it("getMessage",()=>{
        const tc = new TextCreator("ja-JP");
        expect(tc.getMessage("ERROR_GENERAL")).toBe("情報の取得に失敗しました。開発者にお問い合わせください。")
        const obj: any = {
            message: "REMINDER_WEEK"
        }
        expect(tc.getMessage(obj.message)).toBe("今週と来週、どちらのリマインダーを設定しますか？")
    })
})