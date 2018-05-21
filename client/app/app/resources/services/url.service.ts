import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable()
export class UrlService {
  host = environment.apiUrl;
  version = '';

  constructor() {
  };

  isAuth() {
    return this.host + this.version + '/user/isauth'
  };

  userLogin() {
    return this.host + this.version + '/user/login'
  };

  userGet() {
    return this.host + this.version + '/user/get'
  }

  userSignUp() {
    return this.host + this.version + '/user/signup'
  }

  userUpdate() {
    return this.host + this.version + '/user/update'
  }

  updateMe() {
    return this.host + this.version + '/user/updateMe'
  }

  userDestroy() {
    return this.host + this.version + '/user/destroy'
  }

  userPassRestore() {
    return this.host + this.version + 'user/restore'
  }

  callToRestore() {
    return this.host + this.version + 'user/calltorestore'
  }

  logOut() {
    return this.host + this.version + '/user/logout'
  }

  getUsers() {
    return this.host + this.version + '/user/index'
  }

  getUserById() {
    return this.host + this.version + '/user/get'
  }

  createUser() {
    return this.host + this.version + '/user/create'
  }

  updateUser() {
    return this.host + this.version + '/user/update'
  }

  disableUser() {
    return this.host + this.version + '/collaborator/disable'
  }

  destroyUser() {
    return this.host + this.version + '/collaborator/destroy'
  }

  getCollaborators() {
    return this.host + this.version + '/collaborator/index'
  }

  getMyCollaborators() {
    return this.host + this.version + '/collaborator/me'
  }

  getCollaboratorById() {
    return this.host + this.version + '/collaborator/get'
  }

  setCollaborators() {
    return this.host + this.version + '/collaborator/set'
  }

  updateCollaborator() {
    return this.host + this.version + '/collaborator/update'
  }

  getRoles() {
    return this.host + this.version + '/role/index'
  }

  getApplications() {
    return this.host + this.version + '/app/index'
  }

  getApplicationById() {
    return this.host + this.version + '/app/get'
  }

  disableApplication() {
    return this.host + this.version + '/app/disable'
  }

  destroyApplication() {
    return this.host + this.version + '/app/destroy'
  }

  updateApplication() {
    return this.host + this.version + '/app/update'
  }

  createApplication() {
    return this.host + this.version + '/app/create'
  }

  getContentBundles() {
    return this.host + this.version + '/app/getContentBundles'
  }

  disableContentBundle() {
    return this.host + this.version + '/contentBundle/disable'
  }

  destroyContentBundle() {
    return this.host + this.version + '/contentBundle/destroy'
  }

  getContentBundleById() {
    return this.host + this.version + '/contentBundle/get'
  }

  updateContentBundle() {
    return this.host + this.version + '/contentBundle/update'
  }

  createContentBundle() {
    return this.host + this.version + '/contentBundle/create'
  }

  getPropertyBundles() {
    return this.host + this.version + '/app/getPropertyBundles'
  }

  disablePropertyBundle() {
    return this.host + this.version + '/propertyBundle/disable'
  }

  destroyPropertyBundle() {
    return this.host + this.version + '/propertyBundle/destroy'
  }

  getPropertyBundleById() {
    return this.host + this.version + '/propertyBundle/get'
  }

  updatePropertyBundle() {
    return this.host + this.version + '/propertyBundle/update'
  }

  createPropertyBundle() {
    return this.host + this.version + '/propertyBundle/create'
  }

  getContentUnits() {
    return this.host + this.version + '/contentBundle/getContentUnits'
  }

  disableContentUnit() {
    return this.host + this.version + '/contentUnit/disable'
  }

  destroyContentUnit() {
    return this.host + this.version + '/contentUnit/destroy'
  }

  getContentUnitById() {
    return this.host + this.version + '/contentUnit/get'
  }

  updateContentUnit() {
    return this.host + this.version + '/contentUnit/update'
  }

  createContentUnit() {
    return this.host + this.version + '/contentUnit/create'
  }

  getProperties() {
    return this.host + this.version + '/propertyBundle/getProperties'
  }

  disableProperty() {
    return this.host + this.version + '/property/disable'
  }

  getPropertyById() {
    return this.host + this.version + '/property/get'
  }

  updateProperty() {
    return this.host + this.version + '/property/update'
  }

  createProperty() {
    return this.host + this.version + '/property/create'
  }

  destroyProperty() {
    return this.host + this.version + '/property/destroy'
  }

  getStatuses() {
    return this.host + this.version + '/status/index'
  }

  uploadIcon() {
    return this.host + this.version + '/file/uploadIcon'
  }

  uploadArchive() {
    return this.host + this.version + '/file/uploadArchive'
  }

  uploadDefault() {
    return this.host + this.version + '/file/uploadIcon'
  }

  getActiveCount() {
    return this.host + this.version + '/app/activeCount'
  }

  getBundleRequestCount() {
    return this.host + this.version + '/counter/index'
  }

  pullSocket() {
    return this.host + this.version + '/user/socket'
  }
}
