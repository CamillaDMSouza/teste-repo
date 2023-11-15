/**
 * Represents the get the average posts per user for a specific day request data transfer object (DTO).
 */
export interface GetAveragePostsForDayRequestDTO {
  // Gets or sets the user id responsible for the request.
  userId?: string;
  // Gets or sets the specific day for wich we want the posts average.
  day: Date;
}
