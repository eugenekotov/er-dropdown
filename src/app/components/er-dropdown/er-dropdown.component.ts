import { A, ENTER, NINE, SPACE, Z, ZERO } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { debounceTime, Subject } from 'rxjs';

@Component({
    selector: 'app-er-dropdown',
    templateUrl: './er-dropdown.component.html',
    styleUrl: './er-dropdown.component.scss'
})
export class ErDropdownComponent<T> implements OnDestroy {

    @Input()
    set options(value: T[]) {
        this._options = value;
        this.updateFilterVisibility();
    }
    @Input() optionLabel!: keyof T;

    // value
    @Input() value: T | undefined;
    @Output() valueChange = new EventEmitter<T | undefined>();

    @Input()
    set filterThreshold(value: number) {
        this._filterThreshold = value;
        this.updateFilterVisibility();
    }
    @Input() filterPlaceHolder: string = "Serach...";
    @Input() color: string | undefined = undefined;
    @Input() showClear: boolean = false;

    @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();

    @ViewChild('matSelect') matSelect!: MatSelect;
    @ViewChild('input') input: ElementRef | undefined;

    private _options: T[] = [];
    protected selectedOption: T | undefined;
    protected filteredOptions: T[] = [];
    protected filterVisible: boolean = false;
    private _filterThreshold: number = 0;
    protected filterValue: string = "";
    private filterValueChangeSubject$ = new Subject<string>();
    private filterValueChangeSubscription = this.filterValueChangeSubject$.pipe(debounceTime(500))
        .subscribe(value => this.filterOptions(value));

    ngOnDestroy(): void {
        this.filterValueChangeSubscription.unsubscribe();
    }

    protected handleKeydown(event: any) {
        if (event.keyCode === ENTER && this.filteredOptions.length === 1) {
            this.selectedOption = this.filteredOptions[0];
            this.notifySelectionChange();
        }
        if ((event.key && event.key.length === 1) ||
            (event.keyCode >= A && event.keyCode <= Z) ||
            (event.keyCode >= ZERO && event.keyCode <= NINE) ||
            (event.keyCode === SPACE)) {
            event.stopPropagation();
        }
    }

    protected onOpenedChange(open: boolean) {
        if (open && this.filterVisible) {
            this.inputSetFocus();
        }
        if (!open) {
            this.clearFilterValue();
        }
    }

    private inputSetFocus() {
        setTimeout(() => this.input?.nativeElement.focus(), 200);
    }

    private updateFilterVisibility() {
        this.filterVisible = this._filterThreshold < this._options.length;
        this.filterOptions(this.filterValue);
    }

    protected onFilterValueChange(value: string) {
        this.filterValueChangeSubject$.next(value);
    }

    private filterOptions(filterValue: string) {
        const lowerCaseFilterValue = filterValue.toLowerCase();
        this.filteredOptions = this._options.filter(option => (!filterValue || String(option[this.optionLabel]).toLowerCase().includes(lowerCaseFilterValue)));
    }


    protected onClearFilterClick(event: any) {
        event.stopPropagation();
        this.clearFilterValue();
    }

    private clearFilterValue() {
        this.filterValue = "";
        this.onFilterValueChange(this.filterValue);
        this.inputSetFocus();
    }

    protected onClearClick(event: any) {
        event.stopPropagation();
        this.selectedOption = undefined;
        this.notifySelectionChange();
    }

    private notifySelectionChange() {
        this.onSelectionChange(new MatSelectChange(this.matSelect, this.selectedOption));
    }

    protected onSelectionChange(event: MatSelectChange) {
        this.selectionChange.emit(event);
        this.valueChange.emit(event.value);
    }

}
