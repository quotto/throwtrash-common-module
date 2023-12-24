import {jest} from "@jest/globals";
import {encode} from "@msgpack/msgpack"

// jestでESM Nativeを使う場合は、jest.mockの代わりにjest.unstable_mockModuleを使う
jest.unstable_mockModule("request-promise",()=>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        default: async(option: any)=>{
        if (option.uri === process.env.MecabAPI_URL + "/compare") {
            if (option.qs.word1 === "資源ごみ" && option.qs.word2 === "資源ごみ") {
                return encode({
                    match: "資源ごみ",
                    score: 1.0
                });
            }
        }
        throw new Error("request-promise error");
        }
    })
);

// 副作用を伴わない型情報だけのインポートを行う
import type {CompareResult, DBAdapter} from "../client/client.mjs";
// 副作用を伴うインポートはjest.unstable_mockModuleの後にtop-level awaitを使って動的importする
const {TextCreator, TrashScheduleService} = await import("../client/client.mjs");

process.env.MecabAPI_URL = "https://example.com";

class TestDBAdapter implements DBAdapter {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getUserIDByAccessToken(_access_token: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTrashSchedule(_user_id: string): Promise<import("../index.mjs").TrashSchedule> {
        throw new Error("Method not implemented.");
    }
}

describe('compareTwoText',()=>{
    const service = new TrashScheduleService("Asia/Tokyo", new TextCreator("ja-JP"), new TestDBAdapter());
    it('正常データ',async()=>{
        const result: CompareResult = await service.compareTwoText('資源ごみ','資源ごみ');
        console.log(result.match)
        console.log(result.score)
        console.log(JSON.parse(JSON.stringify(result)));
        expect(result.match).toBe("資源ごみ");
        expect(result.score).toBe(1.0);
    });
    it('パラメータエラー', async()=>{
        try {
            await service.compareTwoText('','ビン');
        }catch(err){
            expect(true);
        }
    });
    it('APIエラー', async()=>{
        try {
            await service.compareTwoText('ペットボtる','ビン');
        }catch(err){
            expect(true);
        }
    });
});