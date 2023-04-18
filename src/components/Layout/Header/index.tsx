import { useState, useEffect } from 'react';

import { Paths } from '../../../constants/paths';
import { Container } from '../../styles';
import NavbarItem from './NavbarItem';
import { NavbarLink } from './types';
import { List, Navbar, Wrapper } from './styles';

const navbarList: NavbarLink[] = [
  {
    id: 1,
    value: Paths.EMPLOYEES,
    title: 'Сотрудники',
    isShowLine: true,
  },
  {
    id: 2,
    value: Paths.CONSTRUCTORS,
    title: 'Конструкторы',
    isShowLine: true,
  },
  {
    id: 3,
    value: Paths.REPORTS,
    title: 'Отчеты',
    isShowLine: false,
  },
  {
    id: 4,
    value: Paths.PROJECTS,
    title: 'Проекты',
    isShowLine: true,
  },
  {
    id: 5,
    value: Paths.WORK_TYPES,
    title: 'Типы работ',
    isShowLine: true,
  },
  {
    id: 6,
    value: Paths.PERSONAL_CABINET,
    title: '',
    isShowLine: true,
  },
];

const Header = () => {
  const [list, setList] = useState<NavbarLink[]>(
    JSON.parse(localStorage.getItem('navbar-list') as string) || navbarList
  );

  useEffect(() => {
    localStorage.setItem('navbar-list', JSON.stringify(list));
  }, [list]);

  return (
    <Wrapper>
      <Container>
        <Navbar>
          <List>
            {list.map((navbarLink) => (
              <NavbarItem
                key={navbarLink.id}
                navbarLink={navbarLink}
                list={list}
                setList={setList}
              />
            ))}
          </List>
        </Navbar>
      </Container>
    </Wrapper>
  );
};

export default Header;
