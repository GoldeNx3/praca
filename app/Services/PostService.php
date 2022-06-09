<?php

namespace App\Repositories;

use App\Http\Resources\PostResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Collection;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File as FacadesFile;

class PostService
{
    const IMG_PATH = 'img/travel/post_image';

    protected PostRepository $postRepo;

    /**
     * Metoda konstruująca klase
     * @param string $text Obrabiany tekst
     */
    public function __construct(PostRepository $postRepo)
    {
        $this->postRepo = $postRepo;
    }

    /**
     * Listing all posts
     */
    public function getAll(): AnonymousResourceCollection
    {
        return PostResource::collection($this->postRepo->getAll());
    }

    /**
     * Finds specified post by ID
     * @param int $id
     */
    public function find(int $id): Collection
    {
        return $this->postRepo->find($id);
    }

    /**
     * Create post
     * @param array $data
     */
    public function create(array $data)
    {
        $imageName = null;
        if ($data['image']) {
            $image = $data['image'];
            $destinationPath = public_path(self::IMG_PATH);

            $imageName = Str::slug($data['title']) . '_img_' . time() . '.' . $image->getClientOriginalExtension();
            $imgFile = Image::make($image->getRealPath());
            $imgFile->save($destinationPath . '/' . $imageName);
        }

        $post = $this->postRepo->create([
            'title' => $data['title'],
            'description' => $data['description'],
            'short_description' => $data['short_description'],
            'image' => $imageName,
        ]);

        return $post;
    }

    /**
     * Update specified post
     * Save image to path
     * @param array $data Data to update
     * @param int $id Post ID
     */
    public function update(array $data, int $id)
    {
        $post = $this->postRepo->find($id);

        $imageName = $post->image;
        if ($data['image'] && $data['image'] !== null && !is_string($data['image'])) {
            $image = $data['image'];
            $destinationPath = public_path('img/travel/post_image');

            $fileName = Str::slug($data['title']) . '_img_' . time() . '.' . $image->getClientOriginalExtension();
            $imgFile = Image::make($image->getRealPath());
            $imgFile->save($destinationPath . '/' . $fileName);

            $imageName = $fileName;

            if ($post->image !== null && !empty($post->image)) {
                FacadesFile::delete($destinationPath . '/' . $post->image);
            }
        }

        return $this->postRepo->update([
            'title' => $data['title'],
            'description' => $data['description'],
            'short_description' => $data['short_description'],
            'image' => $imageName,
        ], $id);
    }
}
