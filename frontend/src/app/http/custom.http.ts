import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

@Injectable()
export class HttpCustom {
    constructor(
        private http: Http,
        private authHttp: AuthHttp,
        private route: Router,
        private toastr: ToastsManager,
    ) {
    }

    get(url, data = null) {
        if (tokenNotExpired()) {
            return this.authHttp.get(url, data);
        }else{
            this.toastr.warning('Su sesión ha caducado!', 'Oops!');
            this.route.navigate(['/login']);
        }
    }

    getNoAuth(url, data = null) {
        return this.http.get(url, data);
    }

    post(url, data = null) {
        console.log("HOLA");
        if (tokenNotExpired()) {
            return this.authHttp.post(url, data);
        }else{
            this.toastr.warning('Su sesión ha caducado!', 'Oops!');
            this.route.navigate(['/login']);
        }
    }

    postNoAuth(url, data = null) {
        return this.http.post(url, data);
    }

    put(url, data = null) {
        if (tokenNotExpired()) {
            return this.authHttp.post(url, data);
        } else {
            this.toastr.warning('Su sesión ha caducado!', 'Oops!');
            this.route.navigate(['/login']);
        }
    }

    patch(url, data = null) {
        if (tokenNotExpired()) {
            return this.authHttp.patch(url, data);
        } else {
            this.toastr.warning('Su sesión ha caducado!', 'Oops!');
            this.route.navigate(['/login']);
        }
    }

    delete(url, data = null) {
        if (tokenNotExpired()) {
            return this.authHttp.post(url, data);
        } else {
            this.toastr.warning('Su sesión ha caducado!', 'Oops!');
            this.route.navigate(['/login']);
        }
    }

    handleError(error: any): any {
        console.log(error);
        if (error.status == 400) {
            let data = JSON.parse(error._body);
            if (data.errors){
                return this.parseError(data.errors);
            }else{
                return data;
            }
        } else if (error.status == 401) {
            console.error('An error occurred', error);
            this.toastr.warning('Su sesión ha caducado!', 'Oops!');
            this.route.navigate(['/login']);
        } else if (error.status == 403) {
            console.error('An error occurred', error);
            this.toastr.warning('Operación no permitida!', 'Oops!');
        } else if (error.status == 404) {
            console.error('Not found', error);
            this.toastr.warning('Página no encontrada!', 'Oops!');
        } else if (error.status == 500 || error.status == 405) {
            console.error('An error occurred', error);
            this.toastr.error('Ocurrió un error!', 'Oops!');
        }
    }

    private parseError(err: any): HttpFormErrors {
        let errors = new HttpFormErrors();

        if (typeof err.errors !== 'undefined'){
            errors.form = err.errors;
        }

        for (let key in err.children) {
            if (typeof err.children[key].children === 'object') {
                errors.fields[key] = this.parseError(err.children[key]);
            }else{
                errors.fields[key] = [];
                if (typeof err.children[key].errors !== 'undefined') {
                    errors.fields[key] = err.children[key].errors;
                }
            }
        }

        return errors;
    }
}

export class HttpFormErrors {
    form: Array<string> = [];
    fields: object = {};
}


