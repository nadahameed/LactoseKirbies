# Hacks
import sys

sys.path.append("..")

from flask import Blueprint, render_template, request, session

# Create the blueprint
snake_bp = Blueprint('snake', __name__)


@snake_bp.route("/snake")
def snake(*args, **kwargs):
    # Fetch the user from the database

    if "username" in session:

        import pygame
        import random

        # Initialize pygame
        pygame.init()

        # Game window dimensions
        width = 800
        height = 600

        # Define colors
        white = (255, 255, 255)
        black = (0, 0, 0)
        red = (255, 0, 0)

        # Snake block size and speed
        block_size = 50
        snake_speed = 10

        # Create the game window
        window = pygame.display.set_mode((width, height))
        pygame.display.set_caption("Snake Game")

        clock = pygame.time.Clock()

        font_style = pygame.font.SysFont(None, 30)

        background_image = pygame.image.load("data/background.png")
        background_rect = background_image.get_rect()

        waiting_room_img = pygame.image.load("data/waitingroom.png")

        def display_score(score):
            text = font_style.render("Score: " + str(score), True, white)
            window.blit(text, [0, 0])


        def draw_snake(block_size, snake_list):
            for x in snake_list:
                snake_image = pygame.image.load("data/kirby.gif")
                window.blit(pygame.transform.scale(snake_image,(50,50)), (x[0], x[1], block_size, block_size))


        def game_loop():
            game_over = False
            game_close = False

            # Initial position of the snake
            x1 = width / 2
            y1 = height / 2

            # Change in position
            x1_change = 0
            y1_change = 0

            # Create the snake
            snake_list = []
            snake_length = 1

            # Position of the food
            foodx = round(random.randrange(0, width - block_size) / block_size) * block_size
            foody = round(random.randrange(0, height - block_size) / block_size) * block_size

            score = 0

            def draw_food():
                # Load your custom image
                food_image = pygame.image.load("data/watermelon.png")
                window.blit(pygame.transform.scale(food_image,(50,50)), (foodx, foody))

            while not game_over:

                while game_close:
                    window.blit(waiting_room_img, background_rect)
                    message = "Game Over! Press Q to Quit or C to Play Again"
                    text = font_style.render(message, True, white)
                    window.blit(text, [width / 6, height / 2 - 20])
                    display_score(score)
                    pygame.display.update()

                    # Event handling for game over
                    for event in pygame.event.get():
                        if event.type == pygame.QUIT:
                            game_over = True
                            game_close = False
                        if event.type == pygame.KEYDOWN:
                            if event.key == pygame.K_q:
                                game_over = True
                                game_close = False
                            if event.key == pygame.K_c:
                                game_loop()

                # Event handling for movement
                for event in pygame.event.get():
                    if event.type == pygame.QUIT:
                        game_over = True
                    if event.type == pygame.KEYDOWN:
                        if event.key == pygame.K_LEFT:
                            x1_change = -block_size
                            y1_change = 0
                        elif event.key == pygame.K_RIGHT:
                            x1_change = block_size
                            y1_change = 0
                        elif event.key == pygame.K_UP:
                            y1_change = -block_size
                            x1_change = 0
                        elif event.key == pygame.K_DOWN:
                            y1_change = block_size
                            x1_change = 0

                # Check for collision with boundaries
                if x1 >= width or x1 < 0 or y1 >= height or y1 < 0:
                    game_close = True

                # Update position of the snake
                x1 += x1_change
                y1 += y1_change

                # Update the game window
                #window.fill(white)
                window.blit(background_image, background_rect)
                #pygame.draw.rect(window, white, [foodx, foody, block_size, block_size])
                snake_head = []
                snake_head.append(x1)
                snake_head.append(y1)
                snake_list.append(snake_head)
                if len(snake_list) > snake_length:
                    del snake_list[0]

                # Check for snake collision with itself
                for x in snake_list[:-1]:
                    if x == snake_head:
                        game_close = True

                draw_food()
                draw_snake(block_size, snake_list)
                display_score(score)

                pygame.display.update()

                # Check if snake has eaten the food
                if x1 == foodx and y1 == foody:
                    foodx = round(random.randrange(0, width - block_size) / block_size) * block_size
                    foody = round(random.randrange(0, height - block_size) / block_size) * block_size
                    snake_length += 1
                    score += 1

                clock.tick(snake_speed)

            pygame.quit()


        game_loop()
        return render_template("snake.html")
    else:
        return render_template("login.html")
        
    #return render_template('landing.html')
