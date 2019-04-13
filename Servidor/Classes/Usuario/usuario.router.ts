import {Router} from '../../common/router'
import * as restify from 'restify'
import * as restifyError from 'restify-errors'
import {User} from './usuario.model'
import { authenticate } from '../../security/auth.handler';
import { authorize } from '../../security/authz.handler';

class UserRouter extends Router{
    
    applyRouter(application: restify.Server){

        application.get('/users', (req, resp, next)=>{
            User.find().then(this.render(resp, next)).catch(next)
        })

        application.get('/users/:id', /*authorize('user'),*/ (req, resp, next)=>{
            User.findById(req.params.id).then(this.render(resp, next)).catch(next)
        })

        application.post('/users', (req, resp, next) => {
            let user = new User(req.body)
            user.save().then(user=>{
                user.senha = undefined
                resp.json(user)
            }).catch(next)
            return next()
        })

        application.post('/users/authenticate', authenticate)
/*
        const options = {overWrite: true}
        application.put('/users/:id', (req, resp, next)=>{
            User.update({_id:req.params.id}, req.body, options)
            .exec().then(result=>{ 
                if(result.n){
                    return User.findById(req.params.id).catch(next)
                }
                else{
                    resp.send(404)
                }
            }).then(user=>{
                resp.json(user)
                return next()
            }).catch(next)
        })
*/
        application.patch('/users/:id', (req, resp, next)=>{
            const op = {new:true}
            User.findByIdAndUpdate(req.params.id, req.body, op).then(user=>{
                if(user){
                    resp.json(user)
                    next()
                }
                resp.send(404)
                next()
            })
        })

        application.del('/users/:id', (req, resp, next)=>{
            User.remove({_id:req.params.id}).exec().then((user:any)=>{
                if(user.n){
                    resp.send(204)
                }else{
                    resp.send(404)
                }
                next()
            })
        })
    }
}

export const usersRouter = new UserRouter()