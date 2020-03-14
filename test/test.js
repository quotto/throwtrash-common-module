const assert = require("assert")
const common = require("../index.js");

describe("input check",()=>{
    describe("isNotEmpty",()=>{
        it("string",()=>{
            assert(common.isNotEmpty("テスト"));
        });
        it("Number",()=>{
            assert(common.isNotEmpty(0));
        });
        it("Empty",()=>{
            assert.equal(common.isNotEmpty(""),false);
            assert.equal(common.isNotEmpty(undefined),false);
        });
    });
    describe("isNumber",()=> {
        it("number",()=>{
            assert(common.isNumber(0));
        });
        it("string as number",()=>{
            assert(common.isNumber("0"));
        })
        it("string",()=>{
            assert.equal(common.isNumber("string"),false)
        });
        it("undefined",()=>{
            assert.equal(common.isNumber(undefined),false)
        });
    });
    describe("isNotLessMin",()=>{
        it("not less",()=>{
            assert(common.isNotLessMin(1,1));
        });
        it("less",()=>{
            assert(!common.isNotLessMin(0,1));
        });
        it("undefined",()=>{
            assert(!common.isNotLessMin(undefined,1));
        });
    });
    describe("isNotOverMax",()=>{
        it("not over",()=>{
            assert(common.isNotOverMax(1,1));
        });
        it("over",()=>{
            assert(!common.isNotOverMax(2,1))
        });
        it("undefined",()=>{
            assert(!common.isNotOverMax(undefined,1))
        });
    });
    describe("isValidMonthValue",()=>{
        it("valid",()=>{
            assert(common.isValidMonthValue(10));
        });
        it("less",()=>{
            assert(!common.isValidMonthValue(0))
        });
        it("over",()=>{
            assert(!common.isValidMonthValue(32))
        });
        it("string as number",()=>{
            assert(common.isValidMonthValue("11"));
        });
        it("not number",()=>{
            assert(!common.isValidMonthValue("gy7"));
        });
        it("undefined",()=>{
            assert(!common.isValidMonthValue(undefined))
        });
    });
    describe("isValidTrashType",()=>{
        it("valid other",()=>{
            assert(common.isValidTrashType({type: "other",trash_val: "生ゴミ"},10))
        });
        it("valid preset",()=>{
            assert(common.isValidTrashType({type: "burn", trash_val: ""},10))
        });
        it("invalid over",()=>{
            assert(!common.isValidTrashType({type: "other",trash_val: "あいうえおかきくけこさ"},10))
        });
        it("invalid less",()=>{
            assert(!common.isValidTrashType({type: "other",trash_val: ""},10))
        });
        it("invalid undefined",()=>{
            assert(!common.isValidTrashType({type: "other",trash_val: undefined},10))
        });
    });
    describe("isValidTrashVal",()=>{
        it("valid kanji-kana",()=>{
            assert(common.isValidTrashVal("今のゴミ"));
        });
        it("valid number-alphabet",()=>{
            assert(common.isValidTrashVal("team32"));
        });
        it("invalid mark",()=>{
            assert(!common.isValidTrashVal("te-am32"));
        });
        it("invalid empty",()=>{
            assert(!common.isValidTrashVal(""));
        });
        it("invalid kana-mark",()=>{
            assert(!common.isValidTrashVal("あいう、えお"));
        });
        it("valid blank",()=>{
            assert(common.isValidTrashVal("bla nk"));
        });
        it("invalid undefined",()=>{
            assert(!common.isValidTrashVal(undefined));
        });
    });
    describe("existSchedule",()=>{
        it("exist",()=>{
            assert(common.existSchedule([{type: "weekday"}]));
        });
        it("none",()=>{
            assert(!common.existSchedule([{type: "none"},{type:"weekday"}]));
        });
        it("empty",()=>{
            assert(!common.existSchedule([]));
        });
        it("undefined",()=>{
            assert(!common.existSchedule(undefined));
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
            assert(common.checkTrashes(data));
        });
        it("invalid schedules empty", ()=>{
            const data = [
                {type: "burn",schedules:[]},
                {type: "other", trash_val:"電池",schedules:[{
                    type: "weekday",value: "0"
                }]}
            ];
            assert(!common.checkTrashes(data));
        })
        it("invalid none schedules", ()=>{
            const data = [
                {type: "burn"},
                {type: "other", trash_val:"電池",schedules:[{
                    type: "weekday",value: "0"
                }]}
            ];
            assert(!common.checkTrashes(data));
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
            assert(!common.checkTrashes(data));
            data[1].trash_val = "";
            assert(!common.checkTrashes(data));
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
            assert(!common.checkTrashes(data));
        });
        it("undefined", ()=>{
            assert(!common.checkTrashes(undefined));
        });
    })
});
describe('generateId',()=> {
    it('separatorナシ', ()=>{
        assert.equal(common.generateId().length,32);
    });
    it('separatorあり', ()=>{
        assert.equal(common.generateId('-').length,36);
    });
});