<?php

namespace App\Repositories;

use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Collection;

class UserService
{
    protected UserRepository $userRepo;

    /**
     * Metoda konstruująca klase
     * @param string $text Obrabiany tekst
     */
    public function __construct(UserRepository $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    /**
     * Listing all users
     */
    public function getAll(): AnonymousResourceCollection
    {
        return UserResource::collection($this->userRepo->getAll());
    }

    /**
     * Finds specified user by ID
     * @param int $id
     */
    public function find(int $id): Collection
    {
        return $this->userRepo->find($id);
    }

    /**
     * Create user
     * @param array $data
     */
    public function create(array $data)
    {
        $user = $this->userRepo->create([
            'name' => $data['name'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        if (isset($data['roles'])) {
            $user->syncRoles($data['roles']);
        }


        \Illuminate\Support\Facades\Mail::to($data['email'])
            ->send(new \App\Mail\SendPassword($user, $data['password']));

        return $user;
    }

    /**
     * Update specified user
     * Save image to path
     * @param array $data Data to update
     * @param int $id user ID
     */
    public function update(array $data, int $id)
    {
        $user = $this->userRepo->find($id);

        if (isset($data['roles'])) {
            if (count($data['roles']) == 0) {
                $save = $user->roles()->detach();
            } else {
                $save = $user->syncRoles($data['roles']);
            }
            return $save;
        }

        return $this->userRepo->update([
            'name' => $data['name'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
        ], $id);
    }
}
