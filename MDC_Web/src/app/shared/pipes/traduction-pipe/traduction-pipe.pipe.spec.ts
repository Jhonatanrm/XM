import { TraductionPipe } from '@shared/pipes/traduction-pipe/traduction-pipe.pipe';


describe('SubestationTablePipe', () => {
    it('create an instance', () => {
        const pipe = new TraductionPipe();
        expect(pipe).toBeTruthy();
    });

    it('recive elements and throw the expected value', () => {
        const pipe = new TraductionPipe();
        expect(pipe.transform('Subestación')).toBe('subestation');
        expect(pipe.transform('subestation')).toBe('subestación');
        expect(pipe.transform('OtherValue')).toBe('othervalue');
        expect(pipe.transform(null)).toBe(null);
    });
});
