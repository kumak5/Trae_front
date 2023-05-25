import { useNavigate } from 'react-router-dom';
import { Group } from '@mantine/core';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';

import { Paths } from '../../constants/paths';
import Loader from '../Loader';
import { DashedOrangeButton, OrangeButton, UnstyledButton } from '../styles';
import { DeleteButton } from './styles';

interface Props {
  onBack: () => void;
  isSubmitBtnDisabled?: boolean;
  isSubmitBtnLoading?: boolean;
  isShowSubmitBtn?: boolean;
  onClick?: () => void;
  clickBtnText?: string;
  isShowClickBtn?: boolean;
  submitBtnText?: string;
  isShowDeleteBtn?: boolean;
  onDelete?: () => void;
  isShowDashedBtn?: boolean;
  onDashedBtnClick?: () => void;
  isDashedBtnLoading?: boolean;
  dashedBtnText?: string;
}

const FormHeader = ({
  isSubmitBtnDisabled,
  isSubmitBtnLoading,
  onBack,
  isShowSubmitBtn = true,
  onClick,
  clickBtnText = 'Завершить',
  isShowClickBtn = false,
  submitBtnText = 'Сохранить',
  isShowDeleteBtn = false,
  onDelete,
  isShowDashedBtn = false,
  onDashedBtnClick,
  isDashedBtnLoading = false,
  dashedBtnText = 'Сбросить пароль',
}: Props) => {
  const navigate = useNavigate();

  const handleClickDashedBtn = () => onDashedBtnClick?.();

  return (
    <Group position="apart" spacing={100}>
      <Group spacing={42}>
        <UnstyledButton onClick={onBack} type="button">
          <BsArrowLeft size={50} color="var(--orange)" />
        </UnstyledButton>
        <UnstyledButton onClick={() => navigate(Paths.DASHBOARD)} type="button">
          <BsFillHouseFill size={44} color="var(--orange)" />
        </UnstyledButton>
      </Group>

      <Group spacing={40}>
        {isShowDashedBtn && (
          <DashedOrangeButton onClick={handleClickDashedBtn} type="button">
            {isDashedBtnLoading ? (
              <Loader size={35} />
            ) : (
              <span>{dashedBtnText}</span>
            )}
          </DashedOrangeButton>
        )}
        {isShowDeleteBtn && (
          <DeleteButton onClick={onDelete} type="button">
            Удалить
          </DeleteButton>
        )}
        {isShowSubmitBtn && (
          <OrangeButton
            disabled={isSubmitBtnDisabled}
            $width={171}
            type="submit"
          >
            {isSubmitBtnLoading ? (
              <Loader size={35} />
            ) : (
              <span>{submitBtnText}</span>
            )}
          </OrangeButton>
        )}
        {isShowClickBtn && (
          <OrangeButton onClick={onClick} $width={171} type="button">
            <span>{clickBtnText}</span>
          </OrangeButton>
        )}
      </Group>
    </Group>
  );
};

export default FormHeader;
