import { useState } from "react";
import {GetData,UpdateDatabase}from'./db'

interface Props {
  FIRSTNAME: string;
  LASTNAME: string;
  USERNAME: string;
  PASSWORD: string;
  PHONE: string;
  COMMENT: string;
  isActive: Boolean;
  setIsActive: any;
  items: any;
  seItems: any;
  index: number;
}
export default function EditFile({
  FIRSTNAME,
  LASTNAME,
  USERNAME,
  PASSWORD,
  PHONE,
  COMMENT,
  isActive,
  setIsActive,
  items,
  seItems,
  index,
}: Props) {
  const [FirstName, setFirstName] = useState(FIRSTNAME);
  const [LastName, setLastName] = useState(LASTNAME);
  const [UserName, setUserName] = useState(USERNAME);
  const [Password, setPassword] = useState(PASSWORD);
  const [Phone, setPhone] = useState(PHONE);
  const [Comment, setComment] = useState(COMMENT);

  return (
    <div
      className={`fixed z-20 bg-[#ffffffd4] mr-2 dark:bg-gray-900 shadow-lg rounded-lg h-auto mt-12 w-1/3 top-0  container ${
        isActive ? "right-0" : "-right-1/3"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 absolute right-6 cursor-pointer top-2"
        onClick={() => setIsActive(false) }
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

      <form
        className="w-full h-full p-6 mt-6"
        onSubmit={async(e) => {
          e.preventDefault();
          setIsActive(false);
          console.log(index);

          let EditedItems = items;

          EditedItems[index].FIRSTNAME = FirstName;
          EditedItems[index].LASTNAME = LastName;
          EditedItems[index].PHONE = Phone;
          EditedItems[index].PASSWORD = Password;
          EditedItems[index].COMMENT = Comment;
          EditedItems[index].USERNAME = UserName;

          seItems(EditedItems);

          const userId = await UpdateDatabase(items)

          localStorage.setItem("userId", userId);

          console.log(EditedItems);
        }}
      >
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            FIRSTNAME
          </label>
          <input
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            LASTNAME
          </label>
          <input
            type="text"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Deo"
            required
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            PHONE
          </label>
          <input
            type="text"
            id="confirm_password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="+1 1234 567 890"
            required
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            USERNAME
          </label>
          <input
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="@username"
            required
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            PASSWORD
          </label>
          <input
            type="text"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            COMMENT
          </label>
          <input
            type="text"
            id="confirm_password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Good product"
            required
            value={Comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="w-full flex items-center justify-around">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              var UnDeletedItems: any = items.filter(
                (item: any) =>
                  item.USERNAME !== UserName && item.PASSWORD !== Password
              );
              console.log(UnDeletedItems);
            }}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
