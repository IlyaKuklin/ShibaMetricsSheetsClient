import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YandexApiVerificationCodeReceiverComponent } from './components/yandex-api-verification-code-receiver/yandex-api-verification-code-receiver.component';

const routes: Routes = [
	{
		path: 'verification',
		component: YandexApiVerificationCodeReceiverComponent
	}
];
@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class IntegrationRoutingModule {}
