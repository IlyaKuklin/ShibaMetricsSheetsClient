import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FbApiVerificationCodeReceiverComponent } from './components/fb-api-verification-code-receiver/fb-api-verification-code-receiver.component';
import { YandexApiVerificationCodeReceiverComponent } from './components/yandex-api-verification-code-receiver/yandex-api-verification-code-receiver.component';

const routes: Routes = [
	{
		path: 'verification',
		component: YandexApiVerificationCodeReceiverComponent
	},
	{
		path: 'fb-verification',
		component: FbApiVerificationCodeReceiverComponent
	}
];
@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class IntegrationRoutingModule {}
