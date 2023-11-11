import { useState } from "react";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Home() {
  //define constants
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nameToUpdate, setNameToUpdate] = useState("");
  const [emailToUpdate, setEmailToUpdate] = useState("");
  const [phoneToUpdate, setPhoneToUpdate] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");

  //define functions
  const fetchAllUsers = api.user.getAll.useQuery();
  const fetchOneUser = api.user.getOne.useQuery({
    id: userId,
  });

  const createUserMutation =
    api.user.createUser.useMutation();
  const updateUserMutation =
    api.user.updateUser.useMutation();
  const deleteUserMutation =
    api.user.deleteUser.useMutation();

  //define handlers
  const handleCreateUser = async () => {
    try {
      await createUserMutation.mutateAsync({
        name: name,
        password: password,
        email: email,
        phone: phone,
      });
      setName("");
      setPassword("");
      setEmail("");
      setPhone("");
      await fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUserMutation.mutateAsync({
        id: userIdToUpdate,
        name: nameToUpdate,
        email: emailToUpdate,
        phone: phoneToUpdate,
      });
      setNameToUpdate("");
      setEmailToUpdate("");
      setUserIdToUpdate("");
      setPhoneToUpdate("");
      await fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation.mutateAsync({
        id: userIdToDelete,
      });
      setUserIdToDelete("");
      await fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  //return an empty div
  return (
    <div className="mx-auto p-8">
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">
          Get All Users
        </h2>
      </div>
      <Button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => fetchAllUsers.refetch()}
      >
        Get All Users
      </Button>

      <div className="text- mb-4 mt-4 grid grid-cols-4 gap-4 font-bold">
        <p>Id</p>
        <p>Name</p>
        <p>Email</p>
        <p>Phone</p>
      </div>

      {fetchAllUsers.data?.map((user) => (
        <div
          key={user.id}
          className="my-4 grid grid-cols-4 gap-4 rounded border  bg-transparent p-4 shadow"
        >
          <p>{user.id}</p>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
      ))}

      {/* Get one user UI */}

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">
          Get One User
        </h2>
        <div className="mb-4 flex">
          <Input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Enter user id to get"
            value={userId || ""}
            onChange={(e) =>
              setUserId(String(e.target.value))
            }
          />
          <Button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => fetchOneUser.refetch()}
          >
            Get One User
          </Button>
        </div>
        {fetchOneUser.data && (
          <div>
            <p>Name: {fetchOneUser.data.name}</p>
            <p>Email: {fetchOneUser.data.email}</p>
            <p>Phone: {fetchOneUser.data.phone}</p>
          </div>
        )}
      </div>

      {/* Create User */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">
          Create New User
        </h2>
        <div className="mb-4 flex gap-1">
          <Input
            className="w-1/2 border border-gray-300 p-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className="w-1/2 border border-gray-300 p-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            className="w-1/2 border border-gray-300 p-2"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            className="w-1/2 border border-gray-300 p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          onClick={handleCreateUser}
        >
          Create User
        </Button>
      </div>

      {/* Update User */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">
          Update User
        </h2>
        <div className="mb-4 flex gap-1">
          <Input
            className="mr-2 w-1/2 border border-gray-300 p-2"
            placeholder="Name to update"
            value={nameToUpdate}
            onChange={(e) =>
              setNameToUpdate(e.target.value)
            }
          />
          <Input
            className="w-1/2 border border-gray-300 p-2"
            placeholder="Phone to update"
            value={phoneToUpdate}
            onChange={(e) =>
              setPhoneToUpdate(e.target.value)
            }
          />
          <Input
            className="w-1/2 border border-gray-300 p-2"
            placeholder="Email to update"
            value={emailToUpdate}
            onChange={(e) =>
              setEmailToUpdate(e.target.value)
            }
          />
        </div>
        <Input
          placeholder="Enter user id to update"
          className="mr-2 border border-gray-300 p-2"
          value={userIdToUpdate}
          onChange={(e) =>
            setUserIdToUpdate(e.target.value)
          }
        />
        <Button
          className="mt-2 rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          onClick={handleUpdateUser}
        >
          Update User
        </Button>
      </div>

      {/* Delete User */}

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">
          Delete User
        </h2>
        <Input
          placeholder="Enter user id to delete"
          className="mr-2 border border-gray-300 p-2"
          value={userIdToDelete}
          onChange={(e) =>
            setUserIdToDelete(e.target.value)
          }
        />
        <Button
          className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={handleDeleteUser}
        >
          Delete User
        </Button>
      </div>
    </div>
  );
}
