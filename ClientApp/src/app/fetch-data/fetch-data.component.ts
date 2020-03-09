import { Component, Inject, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
@NgModule({
  imports: [
    ReactiveFormsModule
  ],
})
export class FetchDataComponent {

  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  public forecasts: WeatherForecast[];
  requestForm;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  tester(testObj: Test) {
    const body = JSON.stringify(testObj);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }; 
    return this.http.post<Test>(this.baseUrl + 'weatherforecast', body, httpOptions).subscribe(data => {
      data
    }, error => console.error(error));
  }

}

interface Credentials {
  username: string;
  password: string;
}
interface ActionRequest {
  identifier: string;
  videoUrl: string;
  comment: string;
}
interface Test {
  creds: Credentials,
  actionReq: ActionRequest
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
