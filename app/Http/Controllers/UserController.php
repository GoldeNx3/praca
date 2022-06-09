<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Repositories\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{

    protected UserService $userService;
    /**
     * Class construction method
     * @param PostService $postService Post service
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Get all users
     */
    public function index()
    {
        if (!auth()->user()->can('show user')) {
            return response()->json(["message" => "No roles required"], 403);
        }

        $users = $this->userService->getAll();

        return $users;
    }

    /**
     * Dodaje nowego użytkownika
     * @param Request $request
     * @return type
     */
    public function store(Request $request)
    {
        if (!auth()->user()->can('create user')) {
            return response()->json(["message" => "No roles required"], 403);
        }

        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'name' => 'required|min:6|max:50',
            'first_name' => 'required|min:3|max:30',
            'last_name' => 'required|min:3|max:30',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $this->userService->create($request->toArray());

        return response()->json(["message" => "Success", 'id' => $user['id']], 200);
    }

    /**
     * Pobiera wszystkich moderatorów
     * @return type
     */
    public function getModerators()
    {
        if (!auth()->user()->can('show user')) {
            return response()->json(["message" => "No roles required"], 403);
        }

        $users = \App\Models\User::role(['moderator'])->get();
        $users->load('leaderGroups');
        return \App\Http\Resources\UserResource::collection($users);
    }

    /**
     * Update user data
     * @param Request $request
     * @param User $user
     */
    public function update(Request $request, $id)
    {
        if (!auth()->user()->can('update user')) {
            return response()->json(["message" => $request->all, 'user' => $user], 403);
        }

        if ($request->exists('roles')) {
            $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                //'roles.*' => 'exists:roles,name'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $data = $request->toArray();
            $save = $this->userService->update($data, $id);

            if (!$save) {
                return response()->json(["message" => "Forbidden"], 403);
            }

            return response()->json(["message" => "Success"], 200);
        }

        $data = $request->toArray();
        $save = $this->userService->update($data, $id);

        if (!$save) {
            return response()->json(["message" => "Forbidden"], 403);
        }

        return response()->json(["message" => "Success"], 200);
    }

    public function find(Request $request, $user)
    {
        if (!auth()->user()->can('show user')) {
            return response()->json(["message" => "No roles required"], 403);
        }

        $user = $this->userService->find($user);
        return $user;
    }

    public function getParticipants(Request $request, \App\Models\User $user)
    {
        if (!auth()->user()->can('show user')) {
            return response()->json(["message" => "No roles required"], 403);
        }

        $participants = $user->participants;
        return response()->json(["message" => "Success", 'data' => $participants], 200);
    }

    public function getAdminActivities(Request $request, \App\Models\User $user)
    {
        return $user->allActivities();
    }
}
