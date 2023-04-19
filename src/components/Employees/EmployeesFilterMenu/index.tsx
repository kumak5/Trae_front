import { Dispatch, SetStateAction, useEffect } from 'react';
import { Menu, Checkbox, Group } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import { Status as StatusTitle } from '../../../store/types';
import { Status } from '../../../store/apis/user/types';
import { useGetActiveWorkTypesQuery } from '../../../store/apis/workTypes';
import { LocalStorage } from '../../../constants/localStorage';
import { getItem } from '../../../helpers/getItem';
import Filter from '../../svgs/Filter';
import {
  FilterMenuItemTitle,
  UnstyledButton,
  useCheckboxStyles,
  useFilterMenuStyles,
} from '../../styles';
import EmployeesFilterMenuItem from './EmployeesFilterMenuItem';
import { OverflowWrapper } from './styles';

const statuses = [
  {
    value: Status.ACTIVE,
    title: StatusTitle.ACTIVE,
  },
  {
    value: Status.NOT_ACTIVE,
    title: StatusTitle.BLOCKED,
  },
];

export type ModifiedWorkType = {
  id: number;
  isChecked: boolean;
  workType: string;
};
interface Props {
  typeWorks: number[] | null;
  setTypeWorks: Dispatch<SetStateAction<number[] | null>>;
  resetTypeWork: () => void;
  status: Status | null;
  setStatus: Dispatch<SetStateAction<Status | null>>;
  resetStatus: () => void;
}

const EmployeesFilterMenu = ({
  typeWorks,
  setTypeWorks,
  resetTypeWork,
  status,
  setStatus,
  resetStatus,
}: Props) => {
  const [data, setData] = useLocalStorage<ModifiedWorkType[]>({
    key: LocalStorage.EMPLOYEE_MODIFIED_TYPE_WORKS,
    defaultValue: [],
  });

  const { classes } = useFilterMenuStyles();
  const {
    classes: { input, inner, icon },
  } = useCheckboxStyles();
  const { data: workTypes } = useGetActiveWorkTypesQuery();

  useEffect(() => {
    const modifiedWorkTypes = workTypes?.map((workType) => ({
      id: workType.id,
      workType: workType.name,
      isChecked: false,
    }));

    const storedData = getItem(LocalStorage.EMPLOYEE_MODIFIED_TYPE_WORKS) || [];

    if (storedData?.length) {
      setData(storedData);
    } else {
      setData(modifiedWorkTypes || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workTypes]);

  return (
    <Menu
      classNames={{
        dropdown: classes.dropdown,
        label: classes.label,
        item: classes.item,
      }}
    >
      <Menu.Target>
        <UnstyledButton>
          <Filter />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Статус</Menu.Label>
        {statuses.map((item) => (
          <Menu.Item key={item.value} onClick={() => setStatus(item.value)}>
            <Group spacing={12}>
              <Checkbox
                defaultChecked={item.value === status}
                classNames={{ input, inner, icon }}
              />
              <FilterMenuItemTitle $active={item.value === status}>
                {item.title}
              </FilterMenuItemTitle>
            </Group>
          </Menu.Item>
        ))}
        <Menu.Item onClick={resetStatus}>
          <Group spacing={12}>
            <Checkbox
              defaultChecked={!status}
              classNames={{ input, inner, icon }}
            />
            <FilterMenuItemTitle $active={!status}>Все</FilterMenuItemTitle>
          </Group>
        </Menu.Item>

        <Menu.Label>Категория</Menu.Label>
        <OverflowWrapper>
          <Menu.Item onClick={resetTypeWork}>
            <Group spacing={12}>
              <Checkbox
                defaultChecked={typeWorks?.length === 0}
                classNames={{ input, inner, icon }}
              />
              <FilterMenuItemTitle $active={typeWorks?.length === 0}>
                Все
              </FilterMenuItemTitle>
            </Group>
          </Menu.Item>
          {!!data &&
            data.map((workType) => (
              <EmployeesFilterMenuItem
                key={workType.id}
                workType={workType}
                typeWorks={typeWorks}
                setTypeWorks={setTypeWorks}
                data={data}
                setData={setData}
              />
            ))}
        </OverflowWrapper>
      </Menu.Dropdown>
    </Menu>
  );
};

export default EmployeesFilterMenu;
