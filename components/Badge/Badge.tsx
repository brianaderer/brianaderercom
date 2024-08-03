import { Contact } from '@/interfaces';
import { FC } from "react";
import { MenuLink } from '@/components';

const Badge: FC<{ contact: Contact, visible: boolean }> = ({ contact, visible }) => {
    const {node} = contact;
    const { website, id, name, phoneNumber, email } = node;
    return (
        <div className={`flex flex-col gap-4 text-xl overflow-hidden transition-all items-end border-b border-l border-green-600 p-10 ${visible ? 'opacity-1' : 'opacity-0 -z-10 h-0'}`}>
            <MenuLink selectable={false}>{name}</MenuLink>
            {/*<p>{phoneNumber}</p>*/}
            <MenuLink href={`mailto: ${email}`}>{email}</MenuLink>
            <MenuLink href={`https://www.${website}`}>{website}</MenuLink>
        </div>
    );
};

export default Badge;
