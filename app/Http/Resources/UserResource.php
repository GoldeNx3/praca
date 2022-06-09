<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'full_name' => $this->full_name,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'emailVerified' => $this->email_verified_at,
            'roles' => $this->getRoleNames(),
            'permissions' => $this->allPermissions(),
            'leader_groups' => GroupResource::collection($this->whenLoaded('leaderGroups')),
            'participants' => ParticipantResource::collection($this->whenLoaded('participants')),
            'activities' => $this->relationLoaded('activities') ? $this->allActivities() : [],
            'created_at' => (new \Carbon\Carbon($this->created_at))->format('d-m-Y'),
        ];
    }

}
