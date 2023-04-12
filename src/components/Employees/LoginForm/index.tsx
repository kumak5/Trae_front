import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';

import { useAppDispatch } from '../../../helpers/hooks/useAppDispatch';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import {
  setEmployeeCredentials,
  loginEmployee,
  toggleModal,
} from '../../../store/slices/employee';
import { Employee } from '../../../store/slices/employee/types';
import { Paths } from '../../../constants/paths';
import instance from '../../../config/axiosConfig';
import Loader from '../../Loader';
import ConfirmModal from '../ConfrimModal';
import MaskedTextInput from '../../MaskedInput';
import NumericKeyboard from './NumericKeyboard';
import { Button, GroupForm, useTextInputStyles, Wrapper } from './styles';

interface LoginFormValues {
  pinCode: string;
}

const EmployeeLoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employee, setEmployee] = useState<Employee>();
  const [isInputInFocus, setIsInputInFocus] = useState<boolean>(false);
  const [pinCode, setPinCode] = useState<string>('');

  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector((store) => store.employee);
  const { accessToken } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();
  const {
    classes: { input },
  } = useTextInputStyles();
  const form = useForm({
    initialValues: {
      pinCode: '',
    },
  });

  const reset = () => {
    form.reset();
    setPinCode('');
  };

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const { data } = await instance.get(
        `/employee/login/${values.pinCode}`,
        config
      );
      setEmployee(data);
      setIsLoading(false);
      if (!data.onShift) {
        dispatch(toggleModal(true));
      } else {
        dispatch(setEmployeeCredentials(data));
        navigate(Paths.EMPLOYEE_MAIN);
      }
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      reset();
      setIsLoading(false);
      showErrorNotification(err.response.data.status, err.response.data.error);
    }
  };

  const handleAgreementClick = async () => {
    try {
      if (!employee) return;
      await dispatch(loginEmployee(employee.id)).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      dispatch(toggleModal(false));
      showErrorNotification(err.status, err.error);
    }
  };

  const handleOnKeyboardChange = (value: string) =>
    form.setFieldValue('pinCode', value);

  const handleCloseModal = () => dispatch(toggleModal(false));
  const handleCloseInformModal = () => navigate(Paths.EMPLOYEE_MAIN);

  const disabled = /^\d{3}$/i.test(form.values.pinCode);

  return (
    <>
      <Wrapper>
        <GroupForm onSubmit={form.onSubmit(handleSubmit)}>
          <MaskedTextInput
            mask="000"
            placeholder="Пароль"
            maxLength={3}
            {...form.getInputProps('pinCode')}
            onFocus={() => setIsInputInFocus(true)}
            classNames={{ input }}
          />
          <Button type="submit" disabled={!disabled}>
            {isLoading ? <Loader size={40} /> : 'Подтвердить'}
          </Button>
          <NumericKeyboard
            pinCode={pinCode}
            setPinCode={setPinCode}
            isOpen={isInputInFocus}
            onClose={() => setIsInputInFocus(false)}
            handleOnKeyboardChange={handleOnKeyboardChange}
            reset={reset}
          />
        </GroupForm>
      </Wrapper>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCloseInformModal={handleCloseInformModal}
        handleAgreementClick={handleAgreementClick}
        isHideHomeBtn={false}
        questionTitle={`${employee?.firstName} ${employee?.lastName} начинает <br /> рабочую смену?`}
        informTitle={`${employee?.firstName} ${employee?.lastName}, <br /> добро пожаловать в Trae <br /> Хорошего рабочего дня
        `}
      />
    </>
  );
};

export default EmployeeLoginForm;
