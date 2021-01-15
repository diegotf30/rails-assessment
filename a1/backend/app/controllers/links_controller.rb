class LinksController < ApplicationController
  before_action :set_link, only: [:show, :update, :destroy]

  # GET /links
  # GET /links.json
  def index
    @links = Link.all
  end

  # GET /links/1
  # GET /links/1.json
  def show
  end

  # POST /links
  # POST /links.json
  def create
    @link = Link.new(link_params)

    if @link.save
      render :show, status: :created, location: @link
    else
      render json: @link.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /links/1
  # PATCH/PUT /links/1.json
  def update
    if @link.update(link_params)
      render :show, status: :ok, location: @link
    else
      render json: @link.errors, status: :unprocessable_entity
    end
  end

  # DELETE /links/1
  # DELETE /links/1.json
  def destroy
    @link.destroy
  end

  def redirect
    @link = Link.find_by_short_code(params[:short_code])
    if @link.nil?
      render 'errors/404', status: 404
    else
      @link.update_attributes(clicks: @link.clicks + 1)
      redirect_to @link.url
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_link
      @link = Link.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def link_params
      params.require(:link).permit(:url, :short_code, :clicks, :user_id)
    end
end
