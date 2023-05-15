import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../../constants/paths';
import { useAppDispatch } from '../../../../helpers/hooks/useAppDispatch';
import { UserShortInfo } from '../../../../store/apis/user/types';
import { setConstructor } from '../../../../store/slices/constructor';
import { BgWhiteCardLinkBtn } from '../../../styles';

interface Props {
  user: UserShortInfo;
}

const UserItem = ({ user }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateToEditingPage = () => {
    navigate(Paths.CONSTRUCTOR_EDITING);
    dispatch(setConstructor(user.managerId));
  };

  return (
    <BgWhiteCardLinkBtn onClick={navigateToEditingPage} type="button">
      {user.firstName} {user.lastName}
    </BgWhiteCardLinkBtn>
  );
};

export default UserItem;
