import {Task} from "@/lib/types/Task";
import TaskStatusBadge from "@/components/dashboard/task-status-badge";
import {Button} from "@/components/ui/button";
import {FaTrash, FaRegPenToSquare, FaUserPlus} from "react-icons/fa6";
import DeleteTask from "@/components/dashboard/modals/delete-task";
import {useState} from "react";
import AssignTask from "./modals/assign-task";
import SelectOpts from "@/components/core/select-opts";
import {format} from "date-fns"
import EditTask from "@/components/dashboard/modals/edit-task";


export default function TaskCard({task}: { task: Task }) {
    const [showDelete, setShowDelete] = useState<boolean>(false)
    const [showAssign, setShowAssign] = useState<boolean>(false)
    const [showEdit, setShowEdit] = useState(false)


    return (
        <div className="todo-card">
            <table className="hidden md:table">
                <thead>
                <tr className='grid grid-cols-6'>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Title</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Created at</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Due Date</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Priority</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Description</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Status</th>
                    <th className="px-4 py-2"></th>
                </tr>
                </thead>
                <tbody>
                <tr className='grid grid-cols-6'>
                    <td className="px-4 py-4 text-left text-sm text-gray-700">
                        <p className='truncate'>
                            {task.title}
                        </p>
                    </td>
                    <td className="px-4 py-4 text-left text-sm text-gray-700">
                        <p className='truncate'>
                            {format(task.createdAt as string, "yyyy-MM-dd")}
                        </p>
                    </td>
                    <td className="px-4 py-4 text-left text-sm text-gray-700">
                        <p className='truncate'>
                            {task.dueDate as string}
                        </p>
                    </td>
                    <td className="px-4 py-4 text-left text-sm text-gray-700">
                        <p className='truncate'>
                            {<SelectOpts values={['low', 'mid', 'high']} defaultValue={task.priority as string}
                                         title={'Priority'}/>}

                        </p>
                    </td>
                    <td className="px-4 py-4 text-left text-sm text-gray-700">
                        <p className=''>
                            {task.description}
                        </p>
                    </td>
                    <td className="px-4 py-4 text-left text-sm">
                        <TaskStatusBadge status={task.status as string}/>
                    </td>
                    <td className="">
                        <div className={'flex justify-between gap-5'}>
                            <Button
                                variant="link" size='sm' onClick={() => setShowEdit(!showEdit)}>
                                <div className={'flex gap-1 items-center'}>
                                    <FaRegPenToSquare/>
                                    <p className={'text-sm ml-2'}>
                                        Edit
                                    </p>
                                </div>
                            </Button>
                            <Button
                                variant="secondary" size='sm' className='' onClick={() => setShowAssign(!showAssign)}>
                                <FaUserPlus className={'text-green-00'}/>
                                <p className={'text-sm ml-2'}>
                                    Assign
                                </p>
                            </Button>
                            <Button
                                variant="destructive" size='sm' className='' onClick={() => setShowDelete(!showDelete)}>
                                <div className={'flex gap-1 items-center'}>
                                    <FaTrash/>
                                    <p className={'text-sm ml-2'}>
                                        Delete
                                    </p>
                                </div>
                            </Button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="md:hidden">
                <div className="flex flex-col md:hidden py-4 px-2 bg-white rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{task.title}</h3>
                    <div className="flex mb-2">
                        <span className="text-sm text-gray-500 mr-2">Due Date:</span>
                        <span className="text-sm text-gray-700">{task.dueDate as string}</span>
                    </div>
                    <div className="flex mb-2 items-center">
                        <span className="text-sm text-gray-500 mr-2">Priority:</span>
                        <span className="text-sm text-gray-700">
                            {<SelectOpts values={['low', 'mid', 'high']} defaultValue={task.priority as string}/>}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mr-2">Description</p>
                    <p className="text-sm text-gray-700 mb-4">{task.description}</p>
                    <div className={'flex items-center bg-gray-50 rounded-lg p-2 gap-2'}>
                        <Button
                            variant="ghost" size='icon' onClick={() => setShowEdit(!showEdit)}>
                            <FaRegPenToSquare className='text-lg text-green-500'/>
                        </Button>
                        <Button
                            variant="ghost" size='icon' className='' onClick={() => setShowAssign(!showAssign)}>
                            <FaUserPlus className={'text-green-500 text-lg'}/>
                        </Button>
                        <Button
                            variant="ghost" size='icon' className='' onClick={() => setShowDelete(!showDelete)}>
                            <FaTrash className={'text-red-500 text-lg'}/>
                        </Button>
                        <DeleteTask open={showDelete} setOpen={setShowDelete} id={task.id as string}/>
                        <AssignTask open={showAssign} setOpen={setShowAssign} taskId={task.id as string}/>
                        <EditTask open={showEdit} setOpen={setShowEdit} task={task} />
                    </div>
                </div>
            </div>
        </div>
    )
}