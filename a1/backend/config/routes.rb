Rails.application.routes.draw do
  resources :links
  devise_for :users
  get '/:short_code', to: 'links#redirect'
end
