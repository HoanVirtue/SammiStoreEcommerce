export class SelectionModel {
  public text: string;
  public code?: string;
  public value: any;
  public globalValue?: any;
  public parentId?: any;
  public displayOrder?: number;
  public selected?: boolean;
  public selectable?: boolean = true;
  public level?: number;
  public isDefault?: boolean;

  constructor(text: string, value: any, globalValue: any = null, code?: string, parentId: any = null, displayOrder: number = 0, selected: boolean = false, isDefault?: boolean) {
    this.text = text;
    this.value = value;
    this.globalValue = globalValue;
    this.parentId = parentId;
    this.displayOrder = displayOrder;
    this.selected = selected;
    this.selectable = true;
    this.code = code;
    this.isDefault = isDefault;
  }
}
