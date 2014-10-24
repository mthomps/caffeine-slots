require 'sinatra'

class Slots < Sinatra::Base
  get '/' do
    haml :index
  end
end
