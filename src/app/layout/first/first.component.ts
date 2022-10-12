import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { UrlEndpoint } from 'src/app/shared/util/url-endpoints';

export class Form {
  formCategory!: string;
  formTitle!: string;
  formDescription!: string;
}

export class Question {
  question!: string;
  answerType!: string;
  description!: string;

  // for textbox questions
  answerField!: string;
  minLength = 0;
  maxLength = 0;

  // for checkbox questions
  checkBoxField = [
    {id: 1, value: ''},
  ];
}

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit, OnDestroy {
  // for subscription clean up, we unsubscribe to every subscription whenever we close/destroy the component
  private ngUnsubscribe = new Subject<void>();

  public lstCategory: any;
  public lstQuestion: any;
  public lstAnswerType: any;

  public isAddQuestionVisible = false;

  constructor(
    public form: Form,
    public question: Question,
    private httpService: HttpService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.lstCategory = [
      { value: 'category1', label: 'Category 1' },
      { value: 'category2', label: 'Category 2' },
      { value: 'category3', label: 'Category 3' },
    ];

    this.lstQuestion = [
      { value: 'question1', label: 'Question 1' },
      { value: 'question2', label: 'Question 2' },
      { value: 'question3', label: 'Question 3' },
    ];

    this.lstAnswerType = [
      { value: 'textbox', label: 'Textbox' },
      { value: 'checkbox', label: 'Checkbox' },
    ];
  }

  saveCategory(): void {
    const data = this.form;

    this.httpService.post(UrlEndpoint.ENDPOINT.CATEGORY, data).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      complete: () => {
        // we are passing the data in here so in case the api is down, the form will be shown in the toast message
        this.showSuccess(data);
      },
      error: () => {
        // we are passing the data in here so in case the api is down, the form will be shown in the toast message
        this.showError(data);
      }
    })
  }

  saveQuestion(): void {
    const data = this.question;

    this.httpService.post(UrlEndpoint.ENDPOINT.QUESTION, data).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      complete: () => {
        // we are passing the data in here so in case the api is down, the form will be shown in the toast message
        this.showSuccess(data);
      },
      error: () => {
        // we are passing the data in here so in case the api is down, the form will be shown in the toast message
        this.showError(data);
      }
    })
  }

  showHideAddQuestion() {
    this.isAddQuestionVisible = !this.isAddQuestionVisible;
  }

  checkMinAndMaxInputLength() {
    return this.question.maxLength < 1;
  }

  addCheckBox() {
    this.question.checkBoxField.push({id: this.question.checkBoxField.length + 1, value: ''})
  }

  removeCheckBox(index: number) {
    this.question.checkBoxField.splice(index, 1);
  }

  enableDisableButton(type: string) {
    if(type === 'category') {
      return !Object.values(this.form).some(x => x !== undefined)
    } else {
      if(this.question.answerType === 'checkbox') {
        return !this.question.question && !this.question.answerType && !this.question.description;
      } else {
        return !this.question.question && !this.question.answerType && !this.question.description && !this.question.answerField;
      }
    }
  }

  showSuccess(data: any) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success!',
      detail: `Saved Successfully.. ${JSON.stringify(data)}`,
      life: 4000
    });
  }

  showError(data: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error!',
      detail: `An error was encountered during saving of data.. ${JSON.stringify(data)}`,
      life: 4000
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
