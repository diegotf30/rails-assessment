class LinksController < ApplicationController
  before_action :set_link, only: [:show, :update, :destroy]

  def user_index
    render json: Link.where(user_id: params[:id]), status: :ok
  end

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
      render json: @link, status: :created
    else
      render json: @link.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /links/1
  # PATCH/PUT /links/1.json
  def update
    if @link.update(link_params)
      render json: @link, status: :ok
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
      render file: "#{Rails.root}/public/404.html" , status: 404
    else
      @link.update_attributes(clicks: @link.clicks + 1)
      @visit = Visit.find_by_ip(user_agent.ip)
      if @visit.nil?
        @visit = Visit.create(visit_params)
      else
        @visit.update_attributes(visits: @visit.visits + 1)
      end

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

    def user_agent
      UserAgent.parse(request.headers['User-Agent'])
    end

    def visit_params
      {
        ip: user_agent.ip,
        os: user_agent.os,
        platform: user_agent.platform,
        browser: user_agent.browser,
        mobile: user_agent.mobile?
      }
    end
end
