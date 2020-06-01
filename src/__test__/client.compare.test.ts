/**
 * request-promiseをmockするため別ファイルでテストする
 */
import {TrashScheduleService,TextCreator, DBAdapter} from "../client";

process.env.MecabAPI_URL = "https://example.com";
jest.mock("request-promise", ()=>async(option: any)=>{
    if(option.uri === process.env.MecabAPI_URL+"/compare") {
        if(option.qs.text1 === "資源ごみ" && option.qs.text2 === "資源ごみ") {
            return {
                score: 1.0
            }
        } 
    }
    throw new Error("request-promise error");
});

class TestDBAdapter implements DBAdapter {
    getUserIDByAccessToken(access_token: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getTrashSchedule(user_id: string): Promise<import("..").TrashData[]> {
        throw new Error("Method not implemented.");
    }
}

describe('compareTwoText',()=>{
    const service = new TrashScheduleService("Asia/Tokyo", new TextCreator("ja-JP"), new TestDBAdapter());
    it('正常データ',async()=>{
        const result = await service.compareTwoText('資源ごみ','資源ごみ');
        expect(result).toBe(1.0);
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