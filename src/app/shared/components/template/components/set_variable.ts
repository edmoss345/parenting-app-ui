import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "scripts/types";
import { ITemplateComponent } from "./tmpl.component";

@Component({
    selector: "plh-tmpl-animated-section-group",
    template: ``
})
export class TmplSetVariableComponent implements ITemplateComponent, OnInit {

    @Input() row: FlowTypes.TemplateRow;
    @Input() template: FlowTypes.Template;
    @Input() localVariables: { [name: string]: string };

    ngOnInit() {
        console.log("Ng on init set variable", this.row, this.template, this.localVariables);
        if (this.row && this.template && this.template._setLocalVariable) {
            this.template._setLocalVariable(this.row.name, this.row.value);
        }
    }
}