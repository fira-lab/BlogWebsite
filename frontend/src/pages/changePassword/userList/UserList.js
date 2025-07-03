import React, { useEffect, useState } from 'react';
import PageMenu from '../../../components/pageMenu/PageMenu';
import Search from '../../../components/search/Search';
import { FaTrashAlt } from 'react-icons/fa';
import ChangeRole from '../../../components/changeRole/ChangeRole';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { RESET, deleteUser, getAllUser } from '../../../redux/features/auth/authSlice';
import RedirecLoggedOut from '../../../customHook/RedirecLoggedOut';
import { shortenText } from '../../profile/Profile';
import { confirmAlert } from 'react-confirm-alert';
import { FILTER_USERS, selectUsers } from '../../../redux/features/auth/filterSlice';
import UserStats from '../../../components/userStats/UserStats';
import ReactPaginate from 'react-paginate';
import Loader from '../../../components/loader/Loader';

const UserList = () => {
    RedirecLoggedOut("/login");
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { users, isLoading } = useSelector((state) => state.auth);
    const filteredUsers = useSelector(selectUsers);

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    useEffect(() => {
        dispatch(FILTER_USERS({ users, search }));
    }, [dispatch, users, search]);

    const removeUser = async (id) => {
        await dispatch(deleteUser(id));
        toast.success("User deleted successfully!")
        dispatch(getAllUser());
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Delete User',
            message: 'All the related data will be lost permanently. Are you sure you want to delete?',
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => removeUser(id),
                },
                {
                    label: 'Cancel',
                },
            ],
        });
    };

    const itemsPerPage = 10;
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const displayedUsers = search ? filteredUsers.slice(itemOffset, endOffset) : users.slice(itemOffset, endOffset);
    const pageCount = Math.ceil((search ? filteredUsers.length : users.length) / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % (search ? filteredUsers.length : users.length);
        setItemOffset(newOffset);
    };

    return (
        <section className="bg-gradient-to-r from-blue-500 via-blue-900 via-pink-500 via-blue-900 via-purple-500 to-blue-900 min-h-screen py-8">
            <PageMenu />
            <UserStats />
            {isLoading && <Loader/>}
            <ToastContainer />
            <div className=" mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-semibold text-white">All Users</h3>
                    <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                {!isLoading && displayedUsers.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">No Users Found...</p>
                ) : (
                    <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-200 text-gray-700">
                                <tr>
                                    <th className="py-4 px-6 text-left text-lg font-medium">S/N</th>
                                    <th className="py-4 px-6 text-left text-lg font-medium">Name</th>
                                    <th className="py-4 px-6 text-left text-lg font-medium">Email</th>
                                    <th className="py-4 px-6 text-left text-lg font-medium">Role</th>
                                    <th className="py-4 px-6 text-left text-lg font-medium">Bio</th>

                                    <th className="py-4 px-6 text-left text-lg font-medium">Status</th>
                                    <th className="py-4 px-6 text-left text-lg font-medium">Change Role</th>
                                    <th className="py-4 px-6 text-left text-lg font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-900">
                                {displayedUsers.map((user, index) => {
                                    const { _id, name, email, role, isUpgraded, isVerified,bio } = user;

                                    return (
                                        <tr key={_id} className="border-b">
                                            <td className="py-4 px-6 text-lg">{index + 1 + itemOffset}</td>
                                            <td className="py-4 px-6 text-lg">{shortenText(name, 20)}</td>
                                            <td className="py-4 px-6 text-lg">{email}</td>
                                            <td className="py-4 px-6 text-lg">{role}</td>
                                            <td className="py-4 px-6 text-lg">{bio}</td>
                                            <td className="py-4 px-6 text-lg">
                                                {isVerified ? (
                                                    <span className="text-green-500">Verified</span>
                                                ) : (
                                                    <span className="text-red-500">Not Verified</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-lg">
                                                <ChangeRole _id={_id} email={email} isUpgraded={isUpgraded} />
                                            </td>
                                            <td className="py-4 px-6 text-lg">
                                                <span className={`cursor-pointer ${isUpgraded ? 'text-green-500' : 'text-red-500 hover:text-red-700'}`}>
                                                    <FaTrashAlt size={20} onClick={() => confirmDelete(_id)} />
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="flex justify-center mt-6">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< Previous"
                        containerClassName="flex items-center space-x-2"
                        pageClassName="px-4 py-2 border rounded-md bg-gray-100 hover:bg-blue-200"
                        activeClassName="bg-blue-500 text-white"
                        previousClassName="px-4 py-2 border rounded-md bg-gray-100 hover:bg-blue-200"
                        nextClassName="px-4 py-2 border rounded-md bg-gray-100 hover:bg-blue-200"
                        breakClassName="px-4 py-2 border rounded-md bg-gray-100 hover:bg-blue-200"
                    />
                </div>
            </div>
        </section>
    );
};

export default UserList;
