import { Contact } from '@/interfaces';
import { FC } from "react";
import { MenuLink } from '@/components';

const Badge: FC<{ contact: Contact, visible: boolean }> = ({ contact, visible }) => {
    const {node} = contact;
    const { website, id, name, phoneNumber, email } = node;
    return (
        <div className={`bg-[rgb(var(--background-start-rgb))] leading-tight lg:leading-normal flex flex-col gap-2 lg:gap-4 text-md lg:text-xl overflow-hidden transition-all items-end border-b border-l border-green-600 p-4 lg:p-10 ${visible ? 'opacity-1' : 'opacity-0 -z-10 h-0'}`}>
            <MenuLink className={'custom-after-none text-2xl'} selectable={false}>{name}</MenuLink>
            {/*<p>{phoneNumber}</p>*/}
            <MenuLink href={`mailto: ${email}`}>{email}</MenuLink>
            <MenuLink href={`https://www.${website}`}>{website}</MenuLink>
        </div>
    );
};

export default Badge;
