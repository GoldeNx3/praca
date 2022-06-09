<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Repositories\PostService;
use Illuminate\Http\Request;

class PostController extends Controller
{
    protected $postService;

    /**
     * Class construction method
     * @param PostService $postService Post service
     */
    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }
    /**
     * Show all posts
     * @param Request $request
     */
    public function index(Request $request)
    {
        if (!auth()->user()->can('show post')) {
            return response()->json(["message" => "No roles required"], 403);
        }

        $posts = $this->postService->getAll();
        return response()->json(['message' => 'success', 'data' => $posts], 200);
    }

    /**
     * Show specified post
     * @param Post $post
     */
    public function show(Request $request, $id)
    {
        if (!auth()->user()->can('show post')) {
            return response()->json(["message" => "No roles required"], 403);
        }

        $post = new PostResource($this->postService->find($id));
        return response()->json(['message' => 'success', 'data' => $post], 200);
    }

    /**
     * Store post
     * @param Request $request
     */
    public function store(Request $request)
    {
        if (!auth()->user()->can('create post')) {
            return response()->json(["message" => "No roles required"], 403);
        }

        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'title' => 'required|string|max:50|min:3',
            'description' => 'required|string|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->toArray();
        $offer = $this->postService->create($data);

        if (!$offer) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        return response()->json(['message' => 'success', 'data' => $offer], 200);
    }

    /**
     * Update specified post
     * @param Request $request
     * @param int $id post ID
     */
    public function update(Request $request, $id)
    {
        if (!auth()->user()->can('update post')) {
            return response()->json(["message" => "No roles required"], 403);
        }

        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'title' => 'required|string|max:50|min:3',
            'description' => 'required|string|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->toArray();
        $update = $this->postService->update($data, $id);

        if (!$update) {
            return response()->json(["message" => "error"], 422);
        }

        return response()->json(["message" => "success"], 200);
    }

    /**
     * Delete specified Post
     * @param int $id
     */
    public function destroy($id)
    {
        if (!auth()->user()->can('delete post')) {
            return response()->json(["message" => "No roles required"], 403);
        }

        $delete = $this->post->delete($id);

        if (!$delete) {
            return response()->json(["message" => "error"], 422);
        }

        return response()->json(["message" => "success"], 200);
    }
}
