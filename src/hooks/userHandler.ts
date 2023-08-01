import {dispatch} from './dispatch';
import {
  editUsers,
  deleteUsers,
  addNewUsertoData,
  EditUserById,
  DeleteUserById,
  MakeNewUser,
} from '../redux/slice/users';
import {showToast} from '../utils/toast';

const dispatchAPI = dispatch;

interface EditProps {
  objIndex: number;
  body: {
    first_name: string;
    last_name: string;
    job: string;
  };
  user: {
    id: number;
  };
}

export const handleEditUser: any = (props: EditProps) => {
  const {body, objIndex, user} = props;
  dispatchAPI(editUsers({objIndex: objIndex, body}));
  dispatchAPI(EditUserById({id: user.id, body}));
};

interface DeleteProps {
  objIndex: number;
  body: {
    first_name: string;
    last_name: string;
    job: string;
  };
  userID: number;
  navigation: any;
}

export const handleDeleteUser: any = async (props: DeleteProps) => {
  const {objIndex, userID, navigation} = props;
  await dispatchAPI(DeleteUserById(userID));
  dispatchAPI(deleteUsers({objIndex}));
  showToast({
    position: 'top',
    title: 'Success',
    text: 'Delete Contact Success',
    type: 'success',
  });
  navigation.goBack();
};

export const handleAddNewUser: any = async ({body, data, navigation}: any) => {
  await dispatchAPI(MakeNewUser(body));
  dispatchAPI(addNewUsertoData({data}));
  showToast({
    position: 'top',
    title: 'Success',
    text: 'Add New Contact Success',
    type: 'success',
  });
  navigation.goBack();
};
