<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\v1\TaskCollection;
use App\Http\Resources\v1\TaskResource;
use App\Models\Task;
use App\Models\User;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use \Illuminate\Http\JsonResponse;


/**
 * @group Task management
 *
 * APIs for managing tasks
 *
 */
class TaskController extends Controller
{
    /**
     * Display a all tasks.
     *
     * @apiResourceCollection App\Http\Resources\v1\TaskCollection
     * @apiResourceModel App\Models\Task
     * @return TaskCollection
     */
    public function index(): TaskCollection
    {
        return new TaskCollection(Task::paginate(20));
    }

    /**
     * Store a newly created task.
     * @apiResource App\Http\Resources\v1\TaskResource
     * @apiResourceModel App\Models\Task
     * @BodyParam title required The title of the task.
     * @BodyParam description required The description of the task.
     * @BodyParam due_date required The due date of the task.
     * @param StoreTaskRequest $request
     * @return TaskResource
     *
     */
    public function store(StoreTaskRequest $request): TaskResource
    {
        return new TaskResource(Task::create($request->validated()));
    }

    public function show($id): TaskResource|JsonResponse
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['error' => 'Task not found.'], Response::HTTP_NOT_FOUND);
        }

        return new TaskResource($task);
    }


    /**
     * Update a specific task.
     * @apiResource App\Http\Resources\v1\TaskResource
     * @apiResourceModel App\Models\Task
     * @UrlParam $id string required The ID of the task.
     * @BodyParam title optional The title of the task.
     * @BodyParam description optional The description of the task.
     * @BodyParam due_date optional The due date of the task.
     * @BodyParam status optional The status of the task.
     * @BodyParam priority optional The priority of the task.
     * @param UpdateTaskRequest $request
     * @param Task $task
     * @return TaskResource
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return new TaskResource($task);
    }

    /**
     * Remove a task.
     *
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        //
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['error' => 'Task not found.'], Response::HTTP_NOT_FOUND);
        }

        $task->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * Assign a task to a user.
     *
     * @apiResource App\Http\Resources\v1\TaskResource
     * @apiResourceModel App\Models\Task
     * @UrlParam $id string required The ID of the task.
     * @BodyParam email string required The email of the user to assign the task to.
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function assignTask(Request $request, $id): JsonResponse
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['error' => 'Task not found.'], Response::HTTP_NOT_FOUND);
        }

        $user = User::where('email', $request->input('email'))->first();
        if (!$user) {
            return response()->json(['error' => 'User not found.'], Response::HTTP_NOT_FOUND);
        }

        $task->assigned_to = $user->id;
        $task->assigned_by = $request->user()->id;
        $task->save();

        return response()->json([
            'message' => 'Task assigned successfully to ' . $user->name,
            'task' => new TaskResource($task)
        ]);
    }

}
