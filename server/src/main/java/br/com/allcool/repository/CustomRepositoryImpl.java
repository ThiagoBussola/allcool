package br.com.allcool.repository;

import br.com.allcool.exception.DataNotFoundException;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import javax.persistence.EntityManager;

public class CustomRepositoryImpl<T, I> extends SimpleJpaRepository<T, I>
        implements CustomRepository<T, I> {

    public CustomRepositoryImpl(JpaEntityInformation<T, ?> entityInformation,
                                EntityManager entityManager) {
        super(entityInformation, entityManager);
    }

    @Override
    public T findByIdThrow(I id) {

        return super.findById(id).orElseThrow(DataNotFoundException::new);
    }
}

