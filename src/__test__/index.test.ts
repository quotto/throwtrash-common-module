import * as common from "../index";

describe("input check",()=>{
    describe("isNotEmpty",()=>{
        it("string",()=>{
            expect(common.isNotEmpty("テスト")).toBeTruthy();
        });
        it("Number",()=>{
            expect(common.isNotEmpty(0)).toBeTruthy();
        });
        it("Empty",()=>{
            expect(common.isNotEmpty("")).toBeFalsy();
            expect(common.isNotEmpty(undefined)).toBeFalsy();
        });
    });
    describe("isNumber",()=> {
        it("number",()=>{
            expect(common.isNumber(0)).toBeTruthy();
        });
        it("string as number",()=>{
            expect(common.isNumber("0")).toBeTruthy();
        })
        it("string",()=>{
            expect(common.isNumber("string")).toBeFalsy();
        });
    });
    describe("isNotLessMin",()=>{
        it("not less",()=>{
            expect(common.isNotLessMin(1,1)).toBeTruthy();
        });
        it("less",()=>{
            expect(!common.isNotLessMin(0,1)).toBeTruthy();
        });
    });
    describe("isNotOverMax",()=>{
        it("not over",()=>{
            expect(common.isNotOverMax(1,1)).toBeTruthy();
        });
        it("over",()=>{
            expect(common.isNotOverMax(2,1)).toBeFalsy();
        });
    });
    describe("isValidMonthValue",()=>{
        it("valid",()=>{
            expect(common.isValidMonthValue(10)).toBeTruthy();
        });
        it("less",()=>{
            expect(common.isValidMonthValue(0)).toBeFalsy();
        });
        it("over",()=>{
            expect(common.isValidMonthValue(32)).toBeFalsy();
        });
        it("string as number",()=>{
            expect(common.isValidMonthValue("11")).toBeTruthy();
        });
        it("not number",()=>{
            expect(common.isValidMonthValue("gy7")).toBeFalsy();
        });
    });
    describe("isValidTrashType",()=>{
        it("valid other",()=>{
            expect(common.isValidTrashType({type: "other",trash_val: "生ゴミ", schedules: []},10)).toBeTruthy();
        });
        it("valid preset",()=>{
            expect(common.isValidTrashType({type: "burn", trash_val: "", schedules: []},10)).toBeTruthy();
        });
        it("invalid over",()=>{
            expect(common.isValidTrashType({type: "other",trash_val: "あいうえおかきくけこさ", schedules: []},10)).toBeFalsy();
        });
        it("invalid less",()=>{
            expect(common.isValidTrashType({type: "other",trash_val: "", schedules: []},10)).toBeFalsy();
        });
        it("invalid undefined",()=>{
            expect(common.isValidTrashType({type: "other",trash_val: undefined, schedules:[]},10)).toBeFalsy();
        });
    });
    describe("isValidTrashVal",()=>{
        it("valid kanji-kana",()=>{
            expect(common.isValidTrashVal("今のゴミ")).toBeTruthy();
        });
        it("valid number-alphabet",()=>{
            expect(common.isValidTrashVal("team32")).toBeTruthy();
        });
        it("invalid mark",()=>{
            expect(common.isValidTrashVal("te-am32")).toBeFalsy();
        });
        it("invalid empty",()=>{
            expect(common.isValidTrashVal("")).toBeFalsy();
        });
        it("invalid kana-mark",()=>{
            expect(common.isValidTrashVal("あいう、えお")).toBeFalsy();
        });
        it("valid blank",()=>{
                expect(common.isValidTrashVal("bla nk")).toBeTruthy();
        });
    });
    describe("existSchedule",()=>{
        it("exist",()=>{
            expect(common.existSchedule([{type: "weekday", value: "0"}])).toBeTruthy();
        });
        it("none",()=>{
            expect(common.existSchedule([{type: "none", value: ""},{type:"weekday",value: "0"}])).toBeFalsy();
        });
        it("empty",()=>{
            expect(common.existSchedule([])).toBeFalsy();
        });
    });
    describe("checkTrashes",()=>{
        it("valid", ()=>{
            const data = [
                {type: "burn",schedules:[{
                    type: "month",value: "3"
                }]},
                {type: "other", trash_val:"電池",schedules:[{
                    type: "weekday",value: "0"
                }]}
            ];
            expect(common.checkTrashes(data)).toBeTruthy();
        });
        it("invalid schedules empty", ()=>{
            const data = [
                {type: "burn",schedules:[]},
                {type: "other", trash_val:"電池",schedules:[{
                    type: "weekday",value: "0"
                }]}
            ];
            expect(common.checkTrashes(data)).toBeFalsy();
        })
        it("invalid none schedules", ()=>{
            const data = [
                {type: "burn", schedules: []},
                {type: "other", trash_val:"電池",schedules:[{
                    type: "weekday",value: "0"
                }]}
            ];
            expect(common.checkTrashes(data)).toBeFalsy();
        })
        it("invalid other trash_val", ()=>{
            const data = [
                {type: "burn",schedules:[{
                    type: "month",value: "3"
                }]},
                {type: "other", trash_val:"あいうえおかきくけこさ",schedules:[{
                    type: "weekday",value: "0"
                }]}
            ];
            expect(common.checkTrashes(data)).toBeFalsy();
            data[1].trash_val = "";
            expect(common.checkTrashes(data)).toBeFalsy();
        });
        it("invalid month val", ()=>{
            const data = [
                {type: "burn",schedules:[{
                    type: "month",value: "0"
                }]},
                {type: "other", trash_val:"電池",schedules:[{
                    type: "weekday",value: "0"
                }]}
            ];
            expect(common.checkTrashes(data)).toBeFalsy();
        });
    })
});
describe('generateUUID',()=> {
    it('separatorナシ', ()=>{
        expect(common.generateUUID().length).toBe(32);
    });
    it('separatorあり', ()=>{
        expect(common.generateUUID('-').length).toBe(36);
    });
});
describe('generateRandomCode',()=>{
    it('parameter無し',()=>{
        const result = common.generateRandomCode();
        console.log(result)
        expect(result.length).toBe(10);
    });
    it('parameterあり',()=>{
        const result = common.generateRandomCode(8);
        console.log(result)
        expect(result.length).toBe(8);
    });
})