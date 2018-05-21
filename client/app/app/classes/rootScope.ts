export class RootScope {
  access: any;
  isAuth: boolean = true;
  auth: any;
  admin: any;
  currentUser: boolean;
  demo: any;
  userName: string;
  progress: boolean;
  organization: any;
  collaborators: any;
  tags: any;
  terminals: any;
  currentCollaborator: any;
  queries: any = {
    terminals: {
      name: '',
      params: {
        limit: 2,
        skip: 0,
        count: 4
      }
    }
  }
}
