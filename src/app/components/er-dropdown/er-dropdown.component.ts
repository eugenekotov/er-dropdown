import { A, NINE, SPACE, Z, ZERO } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
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
    @Input('filter-threshold')
    set filterThreshold(value: number) {
        this._filterThreshold = value;
        this.updateFilterVisibility();
    }
    @Input('filter-place-holder') filterPlaceHolder: string = "Serach...";
    @Input() color: string | undefined = undefined;

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
        this.filteredOptions = this._options.filter(option => (!filterValue || String(option[this.optionLabel]).includes(filterValue)));
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
    }

}
