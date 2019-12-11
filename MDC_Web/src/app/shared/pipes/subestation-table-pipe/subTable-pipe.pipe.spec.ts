import { SubstationTablePipe } from '@shared/pipes/subestation-table-pipe/subTable-pipe.pipe';
import { AssetTypeEnum } from '@core/entry-projects/enums/assets-type.enum';

describe('SubstationTablePipe', () => {
  it('create an instance', () => {
    const pipe = new SubstationTablePipe();
    expect(pipe).toBeTruthy();
  });

  it('recive elements and throw the expected value', () => {
    const pipe = new SubstationTablePipe();
    expect(pipe.transform('false')).toBe('Incompleto');
    expect(pipe.transform('true')).toBe('Completo');
    expect(pipe.transform(null)).toBe('N/A');
    expect(pipe.transform('otherWord')).toBe('otherWord');
    expect(pipe.transform(AssetTypeEnum.BUSBAR)).toBe('Barra');
  });
});
