import { ChgParameterTablePipe } from '@shared/pipes/chg-parameter-table-pipe/chgParameterTable-pipe.pipe';

describe('ChgParameterTablePipe', () => {
    it('create an instance', () => {
        const pipe = new ChgParameterTablePipe();
        expect(pipe).toBeTruthy();
    });

    //   it('recive elements and throw the expected value', () => {
    //     const pipe = new LowercaseFormsPipe();
    //     expect(pipe.transform('TESTING1')).toBe('Testing1');
    //     expect(pipe.transform('testING2')).toBe('Testing2');
    //     expect(pipe.transform('TESTing3')).toBe('Testing3');
    //     expect(pipe.transform('"testing4"')).toBe('Testing4');
    //     expect(pipe.transform('tesTiNG5 2PalABras')).toBe('Testing5 2palabras');
    //   });
});
